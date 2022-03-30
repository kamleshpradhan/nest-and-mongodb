/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService, private authService:AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
