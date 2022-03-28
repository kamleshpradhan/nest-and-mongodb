/* eslint-disable prettier/prettier */
import * as mongoose from "mongoose"

export interface Cat extends mongoose.Document{
    readonly id:number;
    readonly name:string;
    readonly age:number;
    readonly breed:string;
}