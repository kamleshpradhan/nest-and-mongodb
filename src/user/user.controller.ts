/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createuser.dto';
import { EditUserDto } from './dto/edituser.dto';
import { identity } from 'rxjs';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getUser() {
    return this.userService.getUser();
  }
  @Get('all')
  getalluser() {
    return this.userService.getAlluser();
  }
  @Get(':id')
  getuserbyId(@Param('id', ParseIntPipe) userId: number) {
    return this.userService.getUserbyid(userId);
  }
  @Post()
  createnewUser(@Body() createUserdto: CreateUserDto) {
    return this.userService.createUser(createUserdto);
  }
  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) userid: number,
    @Body() edituserDto: EditUserDto,
  ) {
    return this.userService.editUser(userid, edituserDto);
  }
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) userId: number) {
    return this.userService.deleteUser(userId);
  }
}
