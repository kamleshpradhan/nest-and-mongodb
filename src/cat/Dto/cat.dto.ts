/* eslint-disable prettier/prettier */
import { IsString, IsNumber } from 'class-validator';

export class CreateCatDto {
  @IsNumber()
  id:number;
  
  @IsString()
  name: string;

  @IsNumber()
  age: string;

  @IsString()
  breed: string;
}
