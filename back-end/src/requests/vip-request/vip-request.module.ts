import { Module } from '@nestjs/common';
import { VipRequestService } from './vip-request.service';
import { SmRequestModule } from '../sm-request/sm-request.module';
import { TemplatesModule } from '../../templates/templates.module';
import { TbGroupsModule } from '../../tb-groups/tb-groups.module';
import { FileLoggerModule } from '../../file-logger/file-logger.module';
import {VipVspModule} from "../../vip-vsp/vip-vsp.module";

@Module({
  providers: [VipRequestService],
  exports: [VipRequestService],
  imports: [
    SmRequestModule,
    TemplatesModule,
    VipVspModule,
    TbGroupsModule,
    FileLoggerModule,
  ],
})
export class VipRequestModule {}
