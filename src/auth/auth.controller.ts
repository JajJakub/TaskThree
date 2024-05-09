import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body(ValidationPipe) registerDto: CreateUserDto) {
    try {
      return await this.authService.register(registerDto);
    } catch (error) {
      throw error;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async loginUser(@Body(ValidationPipe) loginDto: LoginUserDto) {
    const user = await this.authService.login(loginDto);

    if (!user) throw new UnauthorizedException('Bad Credentials');

    return user;
  }
}
