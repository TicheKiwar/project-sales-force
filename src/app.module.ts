import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConnectionModule } from './app.conection';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './modules/roles/roles.module';
import { MenuModule } from './menu/infrastructure/menu.module';

@Module({
  imports: [ConnectionModule,
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'.env',
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
