/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { catchError } from 'rxjs';
import { CatService } from './cat.service';
import { CreateCatDto } from './Dto';



@Controller('cat')
export class CatController {
    constructor(private catService:CatService){}
    @Get()
    getCats(){
        console.log("cats")
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
