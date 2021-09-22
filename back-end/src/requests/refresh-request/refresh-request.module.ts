import { Module } from '@nestjs/common';
import { RefreshRequestService } from './refresh-request.service';
import { SmRequestModule } from '../sm-request/sm-request.module';
import { TemplatesModule } from '../../templates/templates.module';
import { MainViewModule } from '../../main-view/main-view.module';
import { TbGroupsModule } from '../../tb-groups/tb-groups.module';
import { FileLoggerModule } from '../../file-logger/file-logger.module';

@Module({
  providers: [RefreshRequestService],
  exports: [RefreshRequestService],
  imports: [
    SmRequestModule,
    TemplatesModule,
    MainViewModule,
    TbGroupsModule,
    FileLoggerModule,
  ],
})
export class RefreshRequestModule {}
