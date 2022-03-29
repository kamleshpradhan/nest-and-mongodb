/* eslint-disable prettier/prettier */
import { IsString, IsEmail } from "class-validator";

export class AuthDto{
    
    @IsEmail()
    email:string;

    @IsString()
    password:string;
}