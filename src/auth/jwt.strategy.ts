/* eslint-disable prettier/prettier */
import { HttpException,HttpStatus,Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt,Strategy} from "passport-jwt"
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
        const email = payload.useremail
        const user = await this.userService.findByemail(email)
        if(!user){
            throw new HttpException({status:HttpStatus.CONFLICT,message:"Invalid Token"},HttpStatus.CONFLICT)
        }else{
            return user
        }
    }
    
}