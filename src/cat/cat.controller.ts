/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post,UseGuards } from '@nestjs/common';
import { CatService } from './cat.service';
import { CreateCatDto } from './Dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('cat')
export class CatController {
    constructor(private catService:CatService){}
    @Get()
    getCats(){
        return this.catService.getAll()
    }
    @Post()
    createCat(@Body() catDto:CreateCatDto){
        try{
        return this.catService.createCat(catDto)
        }catch(err){
           return err
        }
    }
    @Get(":id")
    getByid(
        @Param('id',ParseIntPipe) catId:number
    ){
        return this.catService.getCat(catId)
    }
    @Patch(':id')
    updateCat(
        @Body() catDto:CreateCatDto,
        @Param('id',ParseIntPipe)catId:number){
            return this.catService.updateCat(catId,catDto)
    }
    @Delete(':id')
    deleteCat(
        @Param('id',ParseIntPipe) catId:number
    ){
        return this.catService.deleteCat(catId)
    }
}
