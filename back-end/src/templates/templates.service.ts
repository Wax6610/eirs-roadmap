import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Templates } from './templates.entity';
import SaveTemplateDto from './types/save-template-dto';
import { MainView } from '../main-view/main-view.entity';
import { TemplateCodesService } from '../template-codes/template-codes.service';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectRepository(Templates)
    private readonly repository: Repository<Templates>,
    private readonly templateCodesService: TemplateCodesService,
  ) {}

  async all() {
    return this.repository.find();
  }

  async get(id: number): Promise<Templates> {
    return this.repository.findOne(id);
  }

  async save({ id, text }: SaveTemplateDto) {
    const entity = await this.repository.findOneOrFail(id);
    entity.text = text;
    return this.repository.save(entity);
  }

  /* Получнеие текста после подстановки значений вместо кодов*/
  async replaceCodes(id: number, entity: unknown): Promise<string> {
    const search = await this.repository.find({ id });
    let text = search[0].text;
    const codes = await this.templateCodesService.all();
    for (const code of codes) {
      const regexp = new RegExp('%' + code.codeName + '%');
      text = text.replace(regexp, entity[code.dbField]);
    }

    text = text.replace('undefined', '');
    text = text.replace('null', '');
    return text;
  }
}
