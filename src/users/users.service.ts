import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { PostEntity } from '../posts/entities/post.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  register(registerDto: CreateUserDto) {
    const user = this.usersRepository.create(registerDto);
    return this.usersRepository.save(user);
  }

  login(loginDto: LoginUserDto) {
    return this.usersRepository.findOne({
      where: { username: loginDto.username, password: loginDto.password },
    });
  }

  findAll() {
    return this.usersRepository.find();
  }

  getUserById(idUser: number) {
    return this.usersRepository.findOne({
      where: {
        id: idUser,
      },
    });
  }

  getUserByEmail(emailUser: string) {
    return this.usersRepository.findOne({
      where: {
        email: emailUser,
      },
    });
  }

  checkIfInDB(usernameDto: string, emailUser: string) {
    return this.usersRepository.exists({
      where: [{ username: usernameDto }, { email: emailUser }],
    });
  }
}
