import { EntityRepository, Repository } from 'typeorm';

import { MainEntity } from './main.entity';
import { ImportDto } from './types/import-dto';
import * as excel from 'exceljs';
import { Field } from './types/field-order';
import { SaveFieldDto } from '../roadmap/types/save-field-dto';
import { VipVspEntity } from '../vip-vsp/vip-vsp.entity';

@EntityRepository(MainEntity)
export class MainRepository extends Repository<MainEntity> {
  /*Разбор файла Excel*/
  async parseFile(file: any, fields: Field[]): Promise<ImportDto[]> {
    const workbook = new excel.Workbook();
    await workbook.xlsx.load(file.buffer);
    const worksheet = workbook.worksheets[0];

    const dtoArray: ImportDto[] = [];

    worksheet.eachRow((row, key) => {
      const dto = {} as ImportDto;
      let counter = 1;
      for (const field of fields) {
        if (row.values[counter] === undefined && !field.isNull)
          dto[field.field] = '';
        else if (row.values[counter] === undefined && field.isNull)
          dto[field.field] = null;
        else if (
          typeof row.values[counter] === 'object' &&
          row.values[counter].result
        )
          dto[field.field] = row.values[counter].result;
        else if (typeof row.values[counter] === 'string')
          dto[field.field] = row.values[counter].toString().trim();
        else dto[field.field] = row.values[counter];

        counter += 1;
      }

      dtoArray.push(dto);
    });
    return dtoArray;
  }

  // Функция для проверки данных из Excel, на наличие новых данных
  // Для более корректного подсчета результата обновлений
  checkIsNewData(
    entity: MainEntity | VipVspEntity,
    dto: ImportDto,
    fields: Field[],
  ): boolean {
    for (const field of fields) {
      if (entity[field.field] != dto[field.field]) return true;
    }
    return false;
  }

  insertNewData(
    entity: MainEntity | VipVspEntity,
    dto: ImportDto,
    fields: Field[],
  ): any {
    for (const field of fields) {
      entity[field.field] = dto[field.field];
    }
    return entity;
  }

  checkHeaders(headers: ImportDto, fields: Field[]): boolean {
    for (const field of fields) {
      if (headers[field.field].toLowerCase() !== field.header.toLowerCase()) {
        console.log(
          headers[field.field].toLowerCase(),
          field.header.toLowerCase(),
        );
        return false;
      }
    }
    return true;
  }

  async saveField(data: SaveFieldDto): Promise<boolean> {
    const entity = await this.findOne({ number: data.key });
    if (entity === undefined) return false;
    entity[data.field] = data.value;
    this.save(entity);
    return true;
  }
}
