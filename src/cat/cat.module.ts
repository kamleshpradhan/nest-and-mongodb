/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
// import { DatabaseModule } from '../database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { CatSchema,Cat } from './schema/catSchema';


@Module({
  imports: [MongooseModule.forFeature([{name:Cat.name,schema:CatSchema}])],
  controllers: [CatController],
  providers: [CatService],
})

export class CatModule {}
