import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from '../guards/local-auth.guard';
import { User } from 'src/common/decorator/user.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthService } from '../application/auth.service';
import { Roles } from 'src/common/decorator/roles.decorator';
import { RolesGuard } from '../guards/role-auth.guard';
import { Users } from 'src/entities/Users.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@User() user: Users) {
    const data = this.authService.login(user);
    return {
      message: 'Login exitoso',
      data,
    };
  }
  @UseGuards(LocalAuthGuard)
  @Get('refresh')
  refresh(@User() user: Users) {
    const data = this.authService.login(user);
    return {
      message: 'Refresh exitoso',
      data,
    };
  }
  //@Roles('administrador')
  @Get('profile')
  @UseGuards(JwtAuthGuard,RolesGuard)
  profile(@User() user: Users) {
    return {
      message: 'Petición correcta',
      user,
    };
  }

}
