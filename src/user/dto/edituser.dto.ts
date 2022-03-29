/* eslint-disable prettier/prettier */
import { IsString, IsEmail } from 'class-validator';

export class EditUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;
}
