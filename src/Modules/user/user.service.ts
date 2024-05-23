import {  Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/entity/Users.entity';

export interface userFineOne{
  id?:number,
  username?:string
}

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
    return await this.userRepository.find({ relations: ['role'] });

  }

  async getOne(userId: number, userEntity?: Users) {
    const user = await this.userRepository.findOne({
      where: { userId: userId },
      
      relations: ['role'],
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
      relations: ['role'],
    });
    if (!user) throw new NotFoundException("User does not exists");
    return user;
    }
  async findOneUser(data:userFineOne){
    return await this.userRepository
            .createQueryBuilder("user")
            .where({username:data.username})
            .addSelect('user.password')
            .leftJoinAndSelect('user.role', 'role')
            .getOne()
    
    
    //.findOneBy({ username })
  }

}
