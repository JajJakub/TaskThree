import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users') // for /users/... requests
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async registerUser(@Body(ValidationPipe) registerDto: CreateUserDto) {
    if (
      await this.usersService.checkIfInDB(
        registerDto.username,
        registerDto.email,
      )
    )
      throw new ConflictException(
        'User with this email or username already exists',
      );
    else return this.usersService.register(registerDto);
  }

  @Post('login')
  async loginUser(@Body(ValidationPipe) loginDto: LoginUserDto) {
    const user = await this.usersService.login(loginDto);

    if (!user) throw new NotFoundException('Bad Credentials');

    return user;
  }

  // @Query('role') role?: 'USER' | 'ADMIN')
  @Get('findAll') findAll() {
    return this.usersService.findAll();
  }

  //order matters, :id should be the last one
  @Get(':id') findById(@Param('id', ParseIntPipe) id: number) {
    return { id };
  }

  //TODO
  @Patch(':id') updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userUpdated: {},
  ) {
    return { id, ...userUpdated };
  }

  //TODO
  @Delete(':id') deleteUser(@Param('id', ParseIntPipe) id: number) {
    return { id };
  }
}
