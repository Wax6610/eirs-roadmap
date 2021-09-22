import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TemplateCodesEntity } from './template-codes.entity';

@Injectable()
export class TemplateCodesService {
  constructor(
    @InjectRepository(TemplateCodesEntity)
    private readonly repository: Repository<TemplateCodesEntity>,
  ) {}

  async all() {
    return this.repository.find({
      order: { name: 'ASC' },
    });
  }
}
