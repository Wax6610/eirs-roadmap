import { Injectable } from '@nestjs/common';
import { SmRequestService } from '../sm-request/sm-request.service';
import { Users } from '../../users/users.entity';
import { CreateRequestDto } from '../sm-request/types/create-request-dto';
import { RefreshRequestDto } from './types/refresh-request-dto';
import { MainViewService } from '../../main-view/main-view.service';
import { TemplatesService } from '../../templates/templates.service';
import { MainView } from '../../main-view/main-view.entity';
import { CheckOptions } from './types/check-options';
import { CheckResultDto } from './types/check-result-dto';
import { TbGroupsService } from '../../tb-groups/tb-groups.service';

@Injectable()
export class RefreshRequestService {
  constructor(
    private readonly smRequestService: SmRequestService,
    private readonly mainViewService: MainViewService,
    private readonly templatesService: TemplatesService,
    private readonly tbGroupsService: TbGroupsService,
  ) {}

  async create(
    user: Users,
    { number, template, replace, remote }: RefreshRequestDto,
  ): Promise<any> {
    // Данные, по устройствам по которым нужно сделать запросы
    const mainViewData = await this.mainViewService.getBySerial(number);
    // Список ДТО на создание запросов
    const createDtoList: CreateRequestDto[] = [];
    // Список устройсв не пошедших проверку
    const checkFailedList: CheckResultDto[] = [];

    // Информация о группах СБС и ТБ
    const tbGroups = await this.tbGroupsService.all();

    // Список коротких имен ТБ, для поверки корректно ли указанн ТБ в устройстве
    const tbShortnames = tbGroups.map((v) => v.shortName);

    // Проходим циклом о всем устройствам, делаем проверку и если все нормально, то создаем запрос.
    // Иначе добавляем его в список непрошедших проверку
    const created = [];
    let dtoArray = [];
    for (const entity of mainViewData) {
      const templateEntity = await this.templatesService.get(template);
      // Проверка
      const check = this.check(entity, {
        replace,
        remote,
        tbShortnames,
        template: templateEntity.codeName,
      });
      if (check.result === false) {
        // Добавляем в список не прошедших проверку
        checkFailedList.push(check);
        continue;
      }

      // тербанк
      const tb = tbGroups.find((v) => v.shortName === entity.tb);
      // текст после замены
      const text = await this.templatesService.replaceCodes(template, entity);

      let assignmentSm =
        'МЦТП Удаленная поддержка АРМ (Восток). Горячая линия (00011575)';
      let assignmentName = 'МЦТП Удаленная поддержка АРМ';

      if (!remote) {
        assignmentSm = tb.sbsSmContact;
        assignmentName = tb.sbsSmCard;
      }

      let tpl = '10004809';
      if (templateEntity.codeName === 'repair') tpl = '10005299';
      //Сопровождение оргтехники общего пользования (CI00306597)
      const dto: CreateRequestDto = {
        callbackContactSm: user.smContact,
        initiatorSm: user.smContact,
        tplId: tpl,
        description: text,
        assignmentSm: assignmentSm,
        assignmentName: assignmentName,
        service: 'CI00872881',
        createdBy: user.smCard,
        number: entity.number,
        template: templateEntity.codeName,
      };

      dtoArray.push(dto);
      if (dtoArray.length > 100) {
        const saved = await this.smRequestService.create(dtoArray);
        const num = saved.map((v) => v.number);
        created.push(...num);
        dtoArray = [];
      }
    }

    // Проверяем осталось ли что-то после цикла
    if (dtoArray.length > 0) {
      const saved = await this.smRequestService.create(dtoArray);
      const num = saved.map((v) => v.number);
      created.push(...num);
    }

    return {
      created,
      checkFailedList,
    };
  }

  /* Различные проверки перед созданием запроса*/
  private check(entity: MainView, options: CheckOptions): CheckResultDto {
    const { replace, tbShortnames, template, remote } = options;
    let result = true;
    const errors = [];

    /* Проверка на повторные запросы */
    if (!replace && template === 'check' && entity.checkRequest != '') {
      result = false;
      errors.push('Запрос уже зарегистрирован');
    }

    if (!replace && template === 'connect' && entity.connectRequest != '') {
      result = false;
      errors.push('Запрос уже зарегистрирован');
    }

    if (!replace && template === 'display' && entity.displayRequest != '') {
      result = false;
      errors.push('Запрос уже зарегистрирован');
    }

    if (!replace && template === 'nettop' && entity.nettopRequest != '') {
      result = false;
      errors.push('Запрос уже зарегистрирован');
    }

    if (!replace && template === 'inventory' && entity.inventoryRequest != '') {
      result = false;
      errors.push('Запрос уже зарегистрирован');
    }

    //Проверка на ТБ
    if (!remote && !tbShortnames.includes(entity.tb)) {
      result = false;
      errors.push('Неверно указан ТБ');
    }

    return { result, errors, serial: entity.number };
  }
}
