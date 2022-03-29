/* eslint-disable prettier/prettier */
import {Controller,Post,Body} from "@nestjs/common"
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service"
import { AuthDto } from "./dto"


@Controller('auth')
export class AuthController{
    constructor(
        private authService:AuthService){}

    @Post('signin')
        async signin(@Body() dto:AuthDto){
            const user =  await this.authService.validateUser(dto.email,dto.password)
            const token = await this.authService.signToken(user.email)
            return{user:user,token:token}
        }
}