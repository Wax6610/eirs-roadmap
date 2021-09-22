import { Injectable } from '@nestjs/common';
import { RoadmapRepository } from './roadmap.repository';
import { RoadmapEntity } from './roadmap.entity';
import { In, IsNull, Not } from 'typeorm';
import { SaveFieldDto } from './types/save-field-dto';

@Injectable()
export class RoadmapService {
  constructor(readonly repository: RoadmapRepository) {}

  async saveAll(enities: RoadmapEntity[]) {
    return this.repository.save(enities);
  }

  async getBySerial(key: number[]) {
    return this.repository.find({
      number: In(key),
    });
  }

  save(data: SaveFieldDto) {
    this.repository.saveField(data);
  }

  // Список решений для аналзиза текста
  getSolutionNotParsed(request: string) {
    return this.repository.getSolutionNotParsed(request);
  }
}
