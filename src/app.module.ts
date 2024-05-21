import { Module } from '@nestjs/common';
import { ConnectionModule } from './interfaces/controllers/controller';

@Module({
  imports: [ConnectionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
