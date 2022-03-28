/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import {Model} from "mongoose"
import {HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CatDocument,Cat } from "./schema/catSchema";
import { InjectModel } from "@nestjs/mongoose";
import { CreateCatDto } from "./Dto";


@Injectable()
export class CatService {
    constructor(@InjectModel(Cat.name) private  catModel: Model<CatDocument>){}
    async getAll() : Promise<Cat[]>{
        console.log("car")
        return await this.catModel.find()
    }
    async createCat(catDto:CreateCatDto): Promise<Cat>{
        const cat = await this.catModel.findOne({name:{$eq:catDto.name}})
        if(cat){
            throw new HttpException({status:HttpStatus.CONFLICT,message:"Username is already taken"},HttpStatus.CONFLICT)
        }
        const createdCat = new this.catModel(catDto)
        return createdCat.save();
    }
    async getCat(catId:number): Promise<Cat>{
        const cat =  await this.catModel.findOne({id:{$eq:catId}})
        if(!cat){
            throw new HttpException({status:HttpStatus.BAD_REQUEST,message:"Inavlid id"},HttpStatus.BAD_REQUEST)
        }else{
            return cat
        }
    }
    async updateCat(catId:number,dto:CreateCatDto):Promise<Cat>{
        const cat = await this.catModel.findOne({id:{$eq:catId}})
        console.log(cat)
        if(!cat){
            throw new HttpException({status:HttpStatus.NOT_FOUND,message:"Cat with id not found"},HttpStatus.NOT_FOUND)
        }else{
            const resp = await this.catModel.findOneAndUpdate({id:{$eq:catId}},dto,{new:true})
            if(resp){
                return(
                    resp
                )
            }else{
                throw new HttpException({status:HttpStatus.BAD_GATEWAY,message:"Temporary error please try again later"},HttpStatus.BAD_GATEWAY)
            }
        }
    }
    async deleteCat(catId:number){
        const cat = await this.catModel.findOne({id:{$eq:catId}})
        if(!cat){
            throw new HttpException({status:HttpStatus.NOT_FOUND,message:"Cat with the given id not found"},HttpStatus.NOT_FOUND)
        }else{
            return await this.catModel.deleteOne({id:{$eq:catId}})
        }
    }
}