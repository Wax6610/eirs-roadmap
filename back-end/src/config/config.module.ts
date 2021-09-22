import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigEntity } from './config.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [ConfigService],
  imports: [TypeOrmModule.forFeature([ConfigEntity])],
  exports: [ConfigService],
})
export class ConfigModule {}
