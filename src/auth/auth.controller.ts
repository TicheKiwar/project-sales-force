import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from 'src/common/decorator/user.decorator';
import { Users } from 'src/entity/Users.entity';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(
    @User() user: Users
  ) {
    return user;
  }

  @Get()
  profile() {}
}
