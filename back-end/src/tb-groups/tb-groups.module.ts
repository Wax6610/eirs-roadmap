import { Module } from '@nestjs/common';
import { TbGroupsService } from './tb-groups.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TbGroupEntity } from './tb-group.entity';

@Module({
  providers: [TbGroupsService],
  imports: [TypeOrmModule.forFeature([TbGroupEntity])],
  exports: [TbGroupsService],
})
export class TbGroupsModule {}
