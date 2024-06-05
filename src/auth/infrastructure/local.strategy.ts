import { Strategy } from "passport-local";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../application/auth.service";
import { Credentials } from "../domain/credentials.auth";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly authService:AuthService
    ) {
        super({
            usernameField:'username',
            passwordField:'password'
        })
    }

    async validate(username:string,password:string){
        const user = await this.authService.validateUser(username,password)
        if (!user) throw new UnauthorizedException("Login user or password does not match");
        return user;
    }
}