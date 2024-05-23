import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { validate } from 'class-validator';

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

  @Get(':username/:password')
  findOne(
    @Param('username') username: string,
    @Param('password') password: string,
  ) {
    return this.userService.findOne(username, password);
  }

  @Patch(':username/:password')
  async update(
    @Param('username') username: string,
    @Param('password') password: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const errorsValidation = await validate(updateUserDto);
      if (errorsValidation.length > 0) {
        const errorMessages = errorsValidation.map(error => Object.values(error.constraints)).join(', ');
        throw new BadRequestException(`Error de validación: ${errorMessages}`);
      }
      const result = await this.userService.updateUser(
        username,
        password,
        updateUserDto,
      );
      return { message: 'Usuario editado con éxito' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { message: 'El usuario no existe' };
      }
      throw error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
