import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigEntity } from './config.entity';

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(ConfigEntity)
    readonly repository: Repository<ConfigEntity>,
  ) {}

  getByOption(option: string) {
    return this.repository.findOneOrFail({
      option,
    });
  }
}
