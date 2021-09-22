import {
  EntityRepository,
  FindManyOptions,
  IsNull,
  Not,
  Repository,
} from 'typeorm';

import { RoadmapEntity } from './roadmap.entity';
import { SaveFieldDto } from './types/save-field-dto';

@EntityRepository(RoadmapEntity)
export class RoadmapRepository extends Repository<RoadmapEntity> {
  async saveField(data: SaveFieldDto): Promise<boolean> {
    const entity = await this.findOne({ number: data.key });
    if (entity === undefined) return false;
    entity[data.field] = data.value;
    this.save(entity);
    return true;
  }

  async getSolutionNotParsed(request: string) {
    const options: FindManyOptions<RoadmapEntity> = {};
    if (request === 'inventory') {
      options.where = { inventoryParsed: 0, inventoryDate : Not(IsNull())};
    }
    options.take = 1000

    return this.find(options);
  }
}
