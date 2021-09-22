import { Module } from '@nestjs/common';
import { VipVspService } from './vip-vsp.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VipVspEntity } from './vip-vsp.entity';
import { MainModule } from '../main/main.module';
import { MainRepository } from '../main/main.repository';
import {VipVspViewEntity} from "./vip-vsp-view.entity";
import {VipVspRoadmapEntity} from "./vip-vsp-roadmap.entity";

@Module({
  providers: [VipVspService],
  imports: [
    TypeOrmModule.forFeature([VipVspEntity, VipVspViewEntity, MainRepository, VipVspRoadmapEntity]),
    MainModule,
  ],
  exports: [VipVspService],
})
export class VipVspModule {}
