import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { Users } from 'src/entities/Users.entity';
import { Credentials } from '../domain/credentials.auth';
import { UserService } from './user.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService:UserService,
        private readonly jwt:JwtService
    ) {
        
    }

    async validateUser(username:string,password:string): Promise<any>{
        const user = await this.userService.findOneUser(username,password);
        
        if (user && await compare(password,user.password)){
            const {password, ...rest}=user;
            return rest;
        }
    }
    
    login(user:Users){
        const {userId,...rest} = user;
        const payload = {sub:userId,username:user.username};
        return {
            user,
                accessToken:this.jwt.sign(payload)
        }
    }

}
