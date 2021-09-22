import { Injectable } from '@nestjs/common';
import {Users} from "../../users/users.entity";
import {RefreshRequestDto} from "./types/refresh-request-dto";
import {CreateRequestDto} from "../sm-request/types/create-request-dto";
import {CheckResultDto} from "./types/check-result-dto";
import {CheckOptions} from "../refresh-request/types/check-options";
import {SmRequestService} from "../sm-request/sm-request.service";
import {TemplatesService} from "../../templates/templates.service";
import {TbGroupsService} from "../../tb-groups/tb-groups.service";
import {VipVspService} from "../../vip-vsp/vip-vsp.service";
import {VipVspViewEntity} from "../../vip-vsp/vip-vsp-view.entity";

@Injectable()
export class VipRequestService {

    constructor(
        private readonly smRequestService: SmRequestService,
        private readonly mainViewService: VipVspService,
        private readonly templatesService: TemplatesService,
        private readonly tbGroupsService: TbGroupsService,
    ) {}

    async create(
        user: Users,
        { number, template, replace, remote }: RefreshRequestDto,
    ): Promise<any> {
        // Данные, по устройствам по которым нужно сделать запросы
        const mainViewData = await this.mainViewService.get(number);

        // Список ДТО на создание запросов
        const createDtoList: CreateRequestDto[] = [];
        // Список устройсв не пошедших проверку
        const checkFailedList: CheckResultDto[] = [];

        // Информация о группах СБС и ТБ
        const tbGroups = await this.tbGroupsService.all();

        // Список коротких имен ТБ, для поверки корректно ли указанн ТБ в устройстве
        const tbShortnames = tbGroups.map((v) => v.fullName);



        // Проходим циклом о всем устройствам, делаем проверку и если все нормально, то создаем запрос.
        // Иначе добавляем его в список непрошедших проверку
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

                console.log(check, 'check');
                // Добавляем в список не прошедших проверку
                checkFailedList.push(check);
                continue;
            }

            // тербанк
            const tb = tbGroups.find((v) => v.fullName === entity.tb);
            // текст после замены
            const text = await this.templatesService.replaceCodes(template, entity);

            //Сопровождение оргтехники общего пользования (CI00306597)
            const dto: CreateRequestDto = {
                callbackContactSm: user.smContact,
                initiatorSm: user.smContact,
                tplId: '10004809',
                description: text,
                assignmentSm: tb.sbsSmContact,
                assignmentName: tb.sbsSmCard,
                service: 'CI00872881',
                createdBy: user.smCard,
                vsp: entity.screenName,
                template: templateEntity.codeName,
            };

            // Добавляем в список на создание
            createDtoList.push(dto);
        }

        const created = await this.smRequestService.create(createDtoList);
        return {
            created: created.map((v) => v.vsp),
            checkFailedList,
        };
    }

    /* Различные проверки перед созданием запроса*/
    private check(entity: VipVspViewEntity, options: CheckOptions): CheckResultDto {
        const { replace, tbShortnames, template, remote } = options;
        let result = true;
        const errors = [];

        /* Проверка на повторные запросы */
        if (!replace && template === 'vip_check' && entity.checkRequest != '') {
            result = false;
            errors.push('Запрос уже зарегистрирован');
        }

        /* Проверка на повторные запросы */
        if (!replace && template === 'vip_connect' && entity.connectRequest != '') {
            result = false;
            errors.push('Запрос уже зарегистрирован');
        }


        if (!remote && !tbShortnames.includes(entity.tb)) {
            result = false;
            errors.push('Неверно указан ТБ');
        }

        return { result, errors, serial: entity.vsp };
    }
}
