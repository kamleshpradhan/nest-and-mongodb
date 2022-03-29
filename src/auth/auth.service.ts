/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import {JwtService} from "@nestjs/jwt"
import { ConfigModule,ConfigService } from '@nestjs/config';

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
