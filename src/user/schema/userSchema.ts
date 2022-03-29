/* eslint-disable prettier/prettier */
import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import {Document} from "mongoose"

export type UserDocument = User & Document;

@Schema()
export class User{
    @Prop({required:true,unique:true})
    id:number
    @Prop({required:true,unique:true})
    name:string
    @Prop({required:true,unique:true})
    email:string
    @Prop({required:true,unique:true})
    password:string
}

export const UserSchema = SchemaFactory.createForClass(User);