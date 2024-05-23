import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/modules/user/user.module';
import { LocalStrategy } from './infrastructure/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './infrastructure/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy:'jwt'
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (conf: ConfigService) => ({
        secret: conf.get('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
    }),
    UserModule,
  ],
  providers: [AuthService, LocalStrategy,JwtStrategy],

  controllers: [AuthController],
})
export class AuthModule {}
