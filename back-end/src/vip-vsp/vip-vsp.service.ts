import { Injectable } from '@nestjs/common';
import { MainRepository } from '../main/main.repository';
import { importFields, importKey } from './types/field-order';
import { InjectRepository } from '@nestjs/typeorm';

import { In, IsNull, Not, Repository } from 'typeorm';
import { VipVspEntity } from './vip-vsp.entity';
import { VipVspViewEntity } from './vip-vsp-view.entity';
import { SaveFieldDto } from './types/save-field-dto';
import { VipVspRoadmapEntity } from './vip-vsp-roadmap.entity';

@Injectable()
export class VipVspService {
  constructor(
    @InjectRepository(VipVspEntity)
    readonly repository: Repository<VipVspEntity>,
    @InjectRepository(VipVspViewEntity)
    readonly viewRepository: Repository<VipVspViewEntity>,
    @InjectRepository(VipVspRoadmapEntity)
    readonly roadmapRepository: Repository<VipVspRoadmapEntity>,
    private readonly mainRepository: MainRepository,
  ) {}

  async import(data: any) {
    const result = await this.mainRepository.parseFile(data, importFields);

    if (result.length === 0) return false;
    let created = 0;
    let updated = 0;
    let ignored = 0;
    const headers = result.shift();

    if (!this.mainRepository.checkHeaders(headers, importFields)) return false;

    for (const val of result) {
      let entity: VipVspEntity = await this.repository.findOne({
        [importKey]: val[importKey],
      });

      if (entity === undefined) {
        const save = this.repository.create(val);

        await this.repository.save(save);
        created++;
      } else {
        if (this.mainRepository.checkIsNewData(entity, val, importFields)) {
          entity = this.mainRepository.insertNewData(entity, val, importFields);
          console.log(entity, val);
          await this.repository.save(entity);
          updated++;
        } else ignored++;
      }
    }

    return {
      created,
      updated,
      ignored,
    };
  }

  find() {
    return this.viewRepository.find({
      order: { vsp: 'ASC' },
    });
  }

  get(vsp: string[]) {
    return this.viewRepository.find({
      screenName: In(vsp),
    });
  }

  async saveField(data: SaveFieldDto) {
    const entity = await this.repository.findOne({ vsp: data.key });
    if (entity === undefined) return false;
    entity[data.field] = data.value;
    this.repository.save(entity);
    return true;
  }

  getCheckSolutions() {
    return this.roadmapRepository.find({
      select: ['checkSolution', 'id'],
      take: 1000,
      where: {
        isParsed: IsNull(),
        checkDate: Not(IsNull()),
      },
    });
  }
}
