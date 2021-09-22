import { Module } from '@nestjs/common';
import { DopZnoService } from './dop-zno.service';
import { DopZnoController } from './dop-zno.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DopZnoEntity} from "./dop-zno.entity";

@Module({
  providers: [DopZnoService],
  controllers: [DopZnoController],
  imports : [TypeOrmModule.forFeature([DopZnoEntity])],
  exports : [DopZnoService]
})
export class DopZnoModule {}
