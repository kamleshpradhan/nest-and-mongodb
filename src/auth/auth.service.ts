/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import {JwtService} from "@nestjs/jwt"
import { ConfigModule,ConfigService } from '@nestjs/config';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService,private config:ConfigService,  private jwt:JwtService) {}

  async validateUser(useremail: string, password: string): Promise<any> {
    const user = await this.userService.findOne(useremail, password);
    const { id, name, email } = user;
    if (user) {
      return { id, name, email };
    } else {
      return null;
    }
  }

  async login(dto:AuthDto){
    const user = await this.userService.findOne(dto.email,dto.password)
    if(!user){
      throw new HttpException({status:HttpStatus.CONFLICT,message:"Invalid credentials"},HttpStatus.CONFLICT)
    }
    const token = await this.signToken(dto.email)
    return{user:{id:user.id,email:user.email,name:user.name},token:token}
  }
  async signToken(useremail: string) {
    const payload = {
      useremail
    }
      const secret = this.config.get<string>('JWT_SECRET')
      const token = await this.jwt.signAsync(payload,{
        expiresIn:"15m",
        secret:secret,
      })
      return token;
  }
}
