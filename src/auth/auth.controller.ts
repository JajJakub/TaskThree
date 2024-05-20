import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';
import { BlacklistService } from '../blacklist/blacklist.service';
import { BlacklistEntity } from '../blacklist/entity/blacklist.entity';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly blacklistService: BlacklistService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({
    description: 'Require login and password in JSON format',
    schema: {
      example: {
        login: 'username',
        password: 'zaq1@WSX',
      },
    },
  })
  async loginUser(@Request() req: any) {
    return await this.authService.login(req.user);
  }

  @Post('register')
  async registerUser(@Body(ValidationPipe) registerDto: CreateUserDto) {
    try {
      return await this.authService.register(registerDto);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(RefreshAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  @ApiBody({
    description: 'Require refresh token',
    schema: {
      example: {
        refreshToken: 'Refresh Token',
      },
    },
  })
  async refresh(@Request() req: any) {
    if (await this.blacklistService.checkIfBlacklisted(req.body.refreshToken))
      throw new UnauthorizedException('Token is blacklisted!');

    return this.authService.refresh(req.user);
  }

  @UseGuards(RefreshAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/invalidate')
  @ApiBody({
    description: 'Require refresh token',
    schema: {
      example: {
        refreshToken: 'Refresh Token',
      },
    },
  })
  async invalidateRefreshToken(@Request() req: any) {
    if (!req.body.refreshToken)
      throw new UnauthorizedException('Incorrect token');

    const decodedToken: { userId: number; expirationDate: number } =
      await this.authService.getRefreshTokenExpiration(req.body.refreshToken);

    try {
      const blacklistEntry: BlacklistEntity =
        await this.blacklistService.addToken({
          refresh_token: req.body.refreshToken,
          expiration_date: new Date(decodedToken.expirationDate),
        });

      return {
        msg: 'Token invalidated successfully, log in to generate new one',
        blacklist_id: blacklistEntry.id,
      };
    } catch (error) {
      throw error;
    }
  }
}
