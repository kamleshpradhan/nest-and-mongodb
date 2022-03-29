/* eslint-disable prettier/prettier */
import * as mongoose from "mongoose"

export interface User extends mongoose.Document{
    readonly id:number
    readonly name:string
    readonly email:string
    readonly password:string
}