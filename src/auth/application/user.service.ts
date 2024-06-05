import {  Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../../Modules/user/dto/create-user.dto';
import { UpdateUserDto } from '../../Modules/user/dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/Users.entity';
import { Credentials } from '../domain/credentials.auth';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(Users)
    private readonly userRepository:Repository<Users>
  ){}

  async create(createUserDto: CreateUserDto) {
    const createUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(createUser);
  }

  async findAll() {
    return await this.userRepository.find();

  }

  async getOne(userId: number, userEntity?: Users) {
    const user = await this.userRepository.findOne({
      where: { userId: userId },
    });

    if (!user || (userEntity && userEntity.userId !== user.userId)) {
      throw new NotFoundException('User does not exist or unauthorized');
    }

    return user;
  }

  async findOne(username: string) {
    const user = 
    await this.userRepository.findOne({
      where: { username },
    });
    if (!user) throw new NotFoundException("User does not exists");
    return user;
    }

  async findOneUser(username:string,password:string){
    return await this.userRepository
            .createQueryBuilder("user")
            .where({username:username})
            .addSelect('user.password')
            .getOne()
  }

}
