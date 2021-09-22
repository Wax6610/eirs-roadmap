import { Module } from '@nestjs/common';
import { RoadmapService } from './roadmap.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoadmapEntity } from './roadmap.entity';
import { RoadmapRepository } from './roadmap.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoadmapEntity, RoadmapRepository])],
  providers: [RoadmapService],
  exports: [RoadmapService],
})
export class RoadmapModule {}
