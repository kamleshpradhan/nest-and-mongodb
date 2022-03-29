/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/userSchema';
import { Model } from 'mongoose';
import { CreateUserDto, EditUserDto } from './dto';
import * as bcrypt from 'bcrypt'
 
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  getUser() {
    return 'Hello this is the user';
  }
  async getAlluser(): Promise<User[]> {
    return await this.userModel.find();
  }
  async findOne(useremail:string,password:string): Promise<User>{
    const user = await this.userModel.findOne({email:{$eq:useremail}})
    if(!user){
      throw new HttpException({status:HttpStatus.NOT_FOUND,message:"Invalid credentials"},HttpStatus.NOT_FOUND)
    }else{
      const  passwordCompare = await bcrypt.compare(password,user.password)
      console.log(passwordCompare)
      if(passwordCompare){
        return user
      }else{
        throw new HttpException({status:HttpStatus.BAD_REQUEST,message:"Invalid credentials"},HttpStatus.BAD_REQUEST)
      }
    }
  }
  async getUserbyid(userId:number){
    const user = await this.userModel.findOne({id:{$eq:userId}})
    if(!user){
      throw new HttpException({status:HttpStatus.NOT_FOUND,message:"user with id not found"},HttpStatus.NOT_FOUND)
    }else{
      return user
    }
  }
  async createUser(createUserdto:CreateUserDto): Promise<User>{
    const user = await this.userModel.findOne({email:{$eq:createUserdto.email}})
    if(user){
      throw new HttpException({status:HttpStatus.BAD_REQUEST,message:"email is already registered"},HttpStatus.BAD_REQUEST)
    }else{
      const saltOrRounds = 10;
      const password = createUserdto.password
      const hash = await bcrypt.hash(password,saltOrRounds)
      const  newuser = await this.userModel.create({...createUserdto,password:hash})
      if(newuser){
        return newuser
      }else{
        throw new HttpException({status:HttpStatus.FORBIDDEN,message:"Please try again later"},HttpStatus.FORBIDDEN)
      }
    }
  }
  async editUser(userid:number, edituserDto:EditUserDto): Promise<User>{
    const user = await this.userModel.findOne({id:{$eq:userid}})
    if(!user){
      throw new HttpException({status:HttpStatus.NOT_FOUND,message:"user with id not found"},HttpStatus.NOT_FOUND)
    }else{
      const updateduser = await this.userModel.findOneAndUpdate({id:{$eq:userid}},edituserDto,{new:true})
      if(!updateduser){
        throw new HttpException({status:HttpStatus.BAD_REQUEST},HttpStatus.BAD_GATEWAY)
      }else{
        return updateduser
      }
    }
  }
  async deleteUser(userId:number){
    const user = await this.userModel.findOne({id:{$eq:userId}});
    if(!user){
      throw new HttpException({status:HttpStatus.NOT_FOUND,message:"Invalid user id"},HttpStatus.NOT_FOUND)
    }else{
      return this.userModel.deleteOne({id:{$eq:userId}})
    }
  }
}
