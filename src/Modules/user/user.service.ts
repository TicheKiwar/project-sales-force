import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/entity/Users.entity';
import { ShowUserDto } from './dto/show-user.dto';
import { plainToClass } from 'class-transformer';

export interface userFineOne {
  id?: number;
  username?: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const createUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(createUser);
  }

  async findAll() {
    //return await this.userRepository.find();
    const users = await this.userRepository.find({
      relations: ['role', 'person'],
    });
    return users.map((user) =>
      plainToClass(ShowUserDto, user, { excludeExtraneousValues: true }),
    );
  }

  async findOne(username: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { username, password },
      relations: ['role', 'person'],
    });
    if (!user) throw new NotFoundException('El usuario no existe');
    return plainToClass(ShowUserDto, user, { excludeExtraneousValues: true });
  }

  async findUser(username: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { username, password },
      relations: ['person'],
    });
    if (!user) throw new NotFoundException('El usuario no existe');
    return user;
  }

  async updateUser(
    username: string,
    password: string,
    updateUserDto: UpdateUserDto,
  ) {
    try{
      const user = await this.findUser(username, password);
      const editedUser = { ...user, ...updateUserDto};
      return await this.userRepository.save(editedUser);
    } catch(error){
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findOneUser(data: userFineOne) {
    return await this.userRepository
      .createQueryBuilder('user')
      .where({ username: data.username })
      .addSelect('user.password')
      .getOne();

    //.findOneBy({ username })
  }
}
