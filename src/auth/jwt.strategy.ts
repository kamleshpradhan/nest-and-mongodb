/* eslint-disable prettier/prettier */
import { HttpException,HttpStatus,Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt,Strategy} from "passport-jwt"
import { jwtConstants } from "./constants";
import { ConfigService } from "@nestjs/config";
import { UserService } from "src/user/user.service";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        config:ConfigService,
        private userService:UserService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey: config.get('JWT_SECRET')
        });
    }
    async validate(payload:any){
        console.log(payload)
        return
    }
    
}