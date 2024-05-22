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
    return await this.userRepository.find();

  }

  async findOne(username: string) {
    const user = 
    await this.userRepository.findOneBy({username});
    if (!user) throw new NotFoundException("User does not exists");
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findOneUser(data:userFineOne){
    return await this.userRepository
            .createQueryBuilder("user")
            .where({username:data.username})
            .addSelect('user.password')
            .getOne()
    
    
    //.findOneBy({ username })
  }

}
