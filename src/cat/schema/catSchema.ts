/* eslint-disable prettier/prettier */
// import * as mongoose from 'mongoose'

// export  const CatSchema = new  mongoose.Schema({
//   name:{type:String,required:true},
//   age:{type:Number,required:true},
//   breed:{type:String,required:true},
//   created_at:{type:Date,default:Date.now()}
// })


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CatDocument = Cat & Document;

@Schema()
export class Cat {
  @Prop({required:true,unique:true})
  id:number

  @Prop({required:true,unique:true})
  name: string;

  @Prop({required:true})
  age: number;

  @Prop({required:true})
  breed: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);