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
            return await this.authService.login(dto)
        }
}