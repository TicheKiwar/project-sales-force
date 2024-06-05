import { Module } from '@nestjs/common';
import { UserService } from '../../auth/application/user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
