import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TextController } from './text/text.controller';
import { CatModule } from './cat/cat.module';
import TextService from './text/text.service';
import { MongooseModule } from '@nestjs/mongoose';
// import { CatController } from './cat/cat.controller';
// import { CatService } from './cat/cat.service';
// import { Cat, CatSchema } from './cat/schema/catSchema';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    CatModule,
  ],
  controllers: [AppController, TextController],
  providers: [AppService, TextService],
})
export class AppModule {}
