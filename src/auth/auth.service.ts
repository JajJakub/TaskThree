import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userDto: LoginUserDto) {
    const user = await this.usersService.getUserByUsername(userDto.username);

    if (user && (await bcrypt.compare(userDto.password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: UserEntity) {
    const { password, ...result } = user;

    return {
      ...result,
      access_token: await this.createAccessToken(user.id, user.username),
      refresh_token: await this.createRefreshToken(user.id),
    };
  }

  async register(userDto: CreateUserDto) {
    const ifInDatabase: boolean = await this.usersService.checkIfInDB(
      userDto.username,
      userDto.email,
    );

    if (ifInDatabase)
      throw new ConflictException(
        'User with this username or email already exists',
      );

    const user: UserEntity = await this.usersService.createUser(userDto);
    const { password, ...result } = user;

    return {
      ...result,
      access_token: await this.createAccessToken(user.id, user.username),
      refresh_token: await this.createRefreshToken(user.id),
    };
  }

  async createRefreshToken(userId: number) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
      },
      { secret: jwtConstants.refresh, expiresIn: '7d' },
    );
  }

  async createAccessToken(userId: number, username: string) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        username: username,
      },
      { secret: jwtConstants.secret, expiresIn: '2m' },
    );
  }

  async refresh(user: UserEntity) {
    return {
      access_token: await this.createAccessToken(user.id, user.username),
    };
  }
}
