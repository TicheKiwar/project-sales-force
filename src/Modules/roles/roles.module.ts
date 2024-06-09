import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from 'src/entities/Roles.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Roles])],
  providers: [RolesService]
})
export class RolesModule {}
