import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from 'src/common/decorator/user.decorator';
import { Users } from 'src/entity/Users.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserService } from 'src/modules/user/user.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './infrastructure/jwt.strategy';

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
  @Post('refresh')
  refresh(@User() user: Users) {
    const data = this.authService.login(user);
    return {
      message: 'Refresh exitoso',
      data,
    };
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@User() user: Users) {
    return {
      message: 'Petición correcta',
      user,
    };
  }
}
