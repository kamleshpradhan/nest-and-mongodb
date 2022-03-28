/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export default class TextService {
  getHello(): string {
    return 'Hello Text';
  }
  sayHello():string{
      return "Hello this is the text page"
  }
}
