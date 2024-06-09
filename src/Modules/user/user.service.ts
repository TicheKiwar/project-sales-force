import {  Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/Users.entity';
import { CreateUserDto } from './dto/create-user.dto';

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

  async getRolesWithMenusAndPermissionsByUser(userId: number) {
    return await this.userRepository.query(`
        SELECT
            r.role AS role,
            m.menu AS menu,
            r.description ,
            json_agg(p.permission ORDER BY p.permission DESC) AS permission
        FROM
            users u
            INNER JOIN roles_users ru ON u.user_id = ru.user_id 
            INNER JOIN roles r ON ru.role_id = r.role_id
            INNER JOIN menus_roles mr ON r.role_id = mr.role_id
            INNER JOIN menus m ON mr.menu_id = m.menu_id
            INNER JOIN permissions_menus pmr ON mr.role_permission_id = pmr.menus_roles_id
            INNER JOIN permissions p ON pmr.permission_id = p.permission_id 
        WHERE
            u.user_id = $1
        GROUP BY
            r.role, m.menu, r.description
        ORDER BY
            r.role, m.menu;
       `, [userId]);
}

}
