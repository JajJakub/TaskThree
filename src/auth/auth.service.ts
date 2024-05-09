import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: LoginUserDto) {
    const user = await this.usersService.getUserByUsername(userDto.username);

    if (!user) {
      throw new NotFoundException();
    }

    if (!(await bcrypt.compare(userDto.password, user.password))) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
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

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
