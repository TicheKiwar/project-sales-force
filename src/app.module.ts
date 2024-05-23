import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConnectionModule } from './app.conection';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './modules/roles/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConnectionModule,
    AuthModule,
    UserModule,
    RolesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
