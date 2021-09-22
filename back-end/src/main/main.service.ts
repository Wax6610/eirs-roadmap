import { Injectable } from '@nestjs/common';
import { MainRepository } from './main.repository';
import { MainEntity } from './main.entity';
import { importFields, importKey } from './types/field-order';
import { SaveFieldDto } from '../roadmap/types/save-field-dto';

@Injectable()
export class MainService {
  constructor(readonly repository: MainRepository) {}

  async import(data: any) {
    const result = await this.repository.parseFile(data, importFields);

    if (result.length === 0) return false;
    let created = 0;
    let updated = 0;
    let ignored = 0;
    const headers = result.shift();

    if (!this.repository.checkHeaders(headers, importFields)) return false;

    for (const val of result) {
      let entity = await this.repository.findOne({
        [importKey]: val[importKey],
      });

      if (entity === undefined) {
        const save = this.repository.create(val);

        await this.repository.save(save);
        created++;
      } else {
        if (this.repository.checkIsNewData(entity, val, importFields)) {
          entity = this.repository.insertNewData(entity, val, importFields);
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

  saveField(data: SaveFieldDto) {
    this.repository.saveField(data);
  }
}
