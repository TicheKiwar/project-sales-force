import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { Users } from 'src/entities/Users.entity';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService:UserService,
        private readonly jwt:JwtService,
        
    ) {
        
    }

    async validateUser(username:string,password:string): Promise<any>{
        const user = await this.userService.findOneUser(username,password);
        
        if (user && await compare(password,user.password)){
            const {password, ...rest}=user;
            return rest;
        }
    }
    
    async login(user:Users){
        const {userId,...rest} = user;
        const payload = {sub:userId,username:user.username};
        const role = await this.userService.getRolesWithMenusAndPermissionsByUser(userId)

        return {
            role,
            accessToken:this.jwt.sign(payload)
        }
        }

}
