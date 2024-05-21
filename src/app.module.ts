import { Module } from '@nestjs/common';
import { ConnectionModule } from './interfaces/controllers/controller';
import { UserModule } from './modules/user/user.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [ConnectionModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
