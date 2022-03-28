/* eslint-disable prettier/prettier */
import { IsString, IsNumber } from 'class-validator';

export class CreateCatDto {
  @IsString()
  name: string;

  @IsNumber()
  age: string;

  @IsString()
  breed: string;
}
