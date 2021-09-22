import {HttpModule, Module} from '@nestjs/common';
import { SchedulerService } from './scheduler.service';

import { RoadmapModule } from '../roadmap/roadmap.module';
import { SchedulerController } from './scheduler.controller';
import {VipVspModule} from "../vip-vsp/vip-vsp.module";
import {MainModule} from "../main/main.module";
import {ConfigModule} from "../config/config.module";

@Module({
  providers: [SchedulerService],
  imports: [RoadmapModule, HttpModule, VipVspModule, MainModule, ConfigModule],
  exports: [SchedulerService],
  controllers: [SchedulerController],
})
export class SchedulerModule {}
