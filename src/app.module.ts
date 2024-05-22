import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ConnectionModule } from './infrastructure/orm/typeorm.config';

@Module({
  imports: [ConnectionModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
