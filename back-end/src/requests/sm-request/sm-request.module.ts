import { Module } from '@nestjs/common';
import { SmRequestService } from './sm-request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmRequestEntity } from './sm-request.entity';
import { SmRequestRepository } from './sm-request.repository';
import { FileLoggerModule } from '../../file-logger/file-logger.module';
import { RoadmapModule } from '../../roadmap/roadmap.module';

import { ScheduleModule } from '@nestjs/schedule';

@Module({
  providers: [SmRequestService],
  imports: [
    TypeOrmModule.forFeature([SmRequestEntity, SmRequestRepository]),
    FileLoggerModule,
    RoadmapModule,

    ScheduleModule.forRoot(),
  ],
  exports: [SmRequestService],
})
export class SmRequestModule {}
