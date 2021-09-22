import { Module } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Templates } from './templates.entity';
import { TemplateCodesModule } from '../template-codes/template-codes.module';
import { FileLoggerModule } from '../file-logger/file-logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Templates]),
    TemplateCodesModule,
    FileLoggerModule,
  ],
  providers: [TemplatesService],
  exports: [TemplatesService],
})
export class TemplatesModule {}
