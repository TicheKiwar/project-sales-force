import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { Menu } from 'src/common/decorator/menu.decorator';
import { TMenu } from 'src/common/TYPES/menu.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MenuGuard } from 'src/auth/guards/menu-auth.guard';
import { PermissionGuard } from 'src/auth/guards/permission-auth.guard';
import { Permission } from 'src/common/decorator/permission.decorator';
import { TPermiso } from 'src/common/TYPES/permission.enum';

@Controller('user')
@Menu(TMenu.ADMIN)
@UseGuards(JwtAuthGuard, MenuGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Permission(TPermiso.READ)
  @UseGuards(PermissionGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

}
