import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

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

  getUserByUsername(username: string) {
    return this.usersRepository.findOne({
      where: {
        username: username,
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

  async createUser(registerDto: CreateUserDto) {
    registerDto.password = await bcrypt.hash(registerDto.password, 10);
    const user = this.usersRepository.create(registerDto);
    return await this.usersRepository.save(user);
  }

  checkIfInDB(login: string, emailUser: string) {
    return this.usersRepository.exists({
      where: [{ username: login }, { email: emailUser }],
    });
  }
}
