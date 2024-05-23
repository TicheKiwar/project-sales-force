import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.userService.findOne(username);
  }

  @Patch(':username')
  update(@Param('username') username: string, @Body() updateUserDto: UpdateUserDto) {
    const data = this.userService.updateUser(username, updateUserDto);
    return {message: 'Usuario editado con exito'}
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
