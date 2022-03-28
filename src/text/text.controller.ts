/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import TextService from './text.service';

@Controller('text')
export class TextController {
  constructor(private textService: TextService) {}
  @Get()
  getHello(): string {
    return this.textService.getHello();
  }
  @Get("hello")
  sayHello():string{
      return this.textService.sayHello();
  }
}
