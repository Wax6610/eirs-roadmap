import { Module } from '@nestjs/common';
import { TemplateCodesService } from './template-codes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateCodesEntity } from './template-codes.entity';
import {FileLoggerModule} from "../file-logger/file-logger.module";

@Module({
  imports: [TypeOrmModule.forFeature([TemplateCodesEntity]),FileLoggerModule],
  providers: [TemplateCodesService],
  exports: [TemplateCodesService],
})
export class TemplateCodesModule {}
