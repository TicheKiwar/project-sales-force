import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ConnectionModule } from './app.conection';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConnectionModule,
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:',env',
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
