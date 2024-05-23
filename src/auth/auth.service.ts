import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { access } from 'fs';
import { Users } from 'src/entity/Users.entity';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthService {

constructor(
    private readonly userService:UserService,
    private readonly jwt:JwtService
) {
    
}

    async validateUser(username:string,password:string): Promise<any>{
        const user = await this.userService.findOneUser({username});
        if (user && await compare(password,user.password)){
            const {password, ...rest}=user;
            return rest;
        }

        return null;
    }
    
    login(user:Users){
        const {userId,...rest} = user;
        const payload = {sub:userId};
        return {
            user,
            accessToken:this.jwt.sign(payload)
        }

    }

}
