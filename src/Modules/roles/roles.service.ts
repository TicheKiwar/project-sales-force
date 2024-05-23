import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/entity/Roles.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Roles)
        private readonly roles:Repository<Roles>
    ) {
        
    }

    async getOne(id:number){
        const role=await this.roles.findOne({where: { roleId: id },
        });
    
        if (!role) {
          throw new NotFoundException('Role does not exist');
        }
    
        return role;
    }

}
