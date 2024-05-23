import { Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthService {

constructor(
    private readonly userService:UserService
) {
    
}

    async validateUser(username:string,password:string): Promise<any>{
        const user = await this.userService.findOneUser({username});
        if (user && await compare(password,user.password)){
            return user;
        }

        return null;
    }
    

}
