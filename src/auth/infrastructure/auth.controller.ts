import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from '../guards/local-auth.guard';
import { User } from 'src/common/decorator/user.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthService } from '../application/auth.service';
import { Users } from 'src/entities/Users.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() user: Users) {
    const data = await this.authService.login(user);
    return {
      message: 'Login exitoso',
      data,
    };
  }
  @UseGuards(LocalAuthGuard)
  @Get('refresh')
  async refresh(@User() user: Users) {
    const data = await this.authService.login(user);
    return {
      message: 'Refresh exitoso',
      data,
    };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  profile(@User() user: Users) {
    return {
      message: 'Petición correcta',
      user,
    };
  }

}
