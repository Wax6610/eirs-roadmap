import { Module } from '@nestjs/common';
import { MainService } from './main.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainEntity } from './main.entity';
import {MainRepository} from "./main.repository";
import {FileLoggerModule} from "../file-logger/file-logger.module";


@Module({
  providers: [MainService],
  imports: [TypeOrmModule.forFeature([MainEntity, MainRepository]), FileLoggerModule],
  exports : [MainService],

})
export class MainModule {}
