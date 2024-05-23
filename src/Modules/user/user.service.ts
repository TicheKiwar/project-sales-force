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
    //return await this.userRepository.find();
    return await this.userRepository.find({relations: ['person']});
  }

  async findOne(username: string) {
    const user = 
    await this.userRepository.findOne({
      where: {username},
      relations: ['person']
    ,});
    if (!user) throw new NotFoundException("El usuario no existe");
    return user;
  }

  async updateUser(username: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(username);

    const editedUser = Object.assign(user, updateUserDto);
    return await this.userRepository.save(editedUser);
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
