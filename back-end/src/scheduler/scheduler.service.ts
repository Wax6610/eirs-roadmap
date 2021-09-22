import { HttpService, Injectable } from '@nestjs/common';
import { VipVspService } from '../vip-vsp/vip-vsp.service';
import { Cron } from '@nestjs/schedule';
import { RoadmapService } from '../roadmap/roadmap.service';
import fetch from 'node-fetch';
import * as https from 'https';
import { MainService } from '../main/main.service';
import { ConfigService } from '../config/config.service';

@Injectable()
export class SchedulerService {
  constructor(
    private readonly httpService: HttpService,
    private readonly roadmapService: RoadmapService,
    private readonly vipVspService: VipVspService,
    private readonly mainService: MainService,
    private readonly configService: ConfigService,
  ) {}

  async test() {
    const apiUrl = '/player/device/properties';
    const result = await this.httpService
      .get(apiUrl, {
        params: {
          code: 'YEY7QQY',
        },
      })
      .toPromise()
      .then((res) => console.log(res.data, 'succes'))
      .catch((error) => console.log(error.response, 'error'));
  }

  //Поиск хештегов в решении запросов на осмотр ВСП
  @Cron('0 */25 * * * *')
  async parseCheckVipSolution() {
    const solutions = await this.vipVspService.getCheckSolutions();
    const screenRegExp = new RegExp('(жк_модель)(.*?)(#)', '');
    const nettopRegExp = new RegExp('(неттоп_наличие_устарел)(.*?)(#)', '');
    const i220RegExp = new RegExp('(220в_наличие)(.*?)(#)', '');
    const lanRegExp = new RegExp('(lan_наличие)(.*?)(#)', '');
    const placeRegExp = new RegExp('(место_наличие)(.*?)(#)', '');
    const warnedRegExp = new RegExp('(рвсп_оповещен)(.*?)(#)', '');

    for (const solution of solutions) {
      const text = solution.checkSolution.toLowerCase();
      const screenFound = await screenRegExp.exec(text);
      const nettopFound = await nettopRegExp.exec(text);
      const i220Found = await i220RegExp.exec(text);
      const lanFound = await lanRegExp.exec(text);
      const placeFound = await placeRegExp.exec(text);
      const warnedFound = await warnedRegExp.exec(text);

      if (screenFound) solution.screen = screenFound[2];
      if (nettopFound) solution.nettop = nettopFound[2];
      if (i220Found) solution.i220 = i220Found[2];
      if (lanFound) solution.lan = lanFound[2];
      if (placeFound) solution.place = placeFound[2];
      if (warnedFound) solution.warned = warnedFound[2];

      solution.isParsed = true;

      this.vipVspService.roadmapRepository.save(solution);
    }
  }

  //Поиск хештегов в решении запросов на инвентаризацию
  @Cron('0 */30 * * * *')
  async parseInventorySolutions() {
    const solutions = await this.roadmapService.getSolutionNotParsed(
      'inventory',
    );

    const typeRegExp = new RegExp('(##Типточкивещания##)(.*?)(#)', '');
    const tbRegExp = new RegExp('(##ТБ##)(.*?)(#)', '');
    const postRegExp = new RegExp(
      '(##почтовыйадрес##|##почтовыйадрес#)(.*?)(#)',
      '',
    );
    const floorRegExp = new RegExp('(##Этаж##|##Этаж#)(.*?)(#)', '');
    const zoneRegExp = new RegExp(
      '(##зона\\*сектор##|##зона\\*сектор#)(.*?)(#)',
      '',
    );
    const cabinetRegExp = new RegExp('(##кабинет##|##кабинет#)(.*?)(#)', '');
    const workplaceRegExp = new RegExp(
      '(##рабочееместо##|##рабочееместо#)(.*?)(#)',
      '',
    );
    const nettopSerialRegExp = new RegExp(
      '(##сериныйномернеттопа##|##сериныйномернеттопа#)(.*?)(#)',
      '',
    );
    const nettopNumberRegExp = new RegExp(
      '(##инвентарныйномернеттопа##|##инвентарныйномернеттопа#)(.*?)(#)',
      '',
    );
    const nettopMakerRegExp = new RegExp(
      '(#фирмапроизводительнеттопа##|#фирмапроизводительнеттопа#)(.*?)(#)',
      '',
    );
    const nettopModelRegExp = new RegExp(
      '(##кодмоделинеттопа##|##кодмоделинеттопа#)(.*?)(#)',
      '',
    );
    const nettopDomenRegExp = new RegExp(
      '(##доменноеимянеттопа##|##доменноеимянеттопа#)(.*?)(#)',
      '',
    );
    const ipRegExp = new RegExp(
      '(##ipадреснеттопа#|##ipадреснеттопа##)(.*?)(#)',
      '',
    );
    const macRegExp = new RegExp(
      '(##MACEthernet##|##MACEthernet#)(.*?)(#)',
      '',
    );
    const resRegExp = new RegExp(
      '(##РазрешениеЭкранаЖК##|РазрешениеЭкранаЖК#)(.*?)(#)',
      '',
    );
    const lcdSerialRegExp = new RegExp(
      '(##серийныйномерЖК##|##серийныйномерЖК#)(.*?)(#)',
      '',
    );
    const lcdNumberRegExp = new RegExp(
      '(##инвентарныййномерЖК##|##инвентарныййномерЖК#)(.*?)(#)',
      '',
    );
    const lcdMakerlRegExp = new RegExp(
      '(#фирмапроизводительЖК##|#фирмапроизводительЖК#)(.*?)(#)',
      '',
    );

    const lcdModelRegExp = new RegExp('(##модельЖК##|##модельЖК#)(.*?)(#)', '');

    const diagonalRegExp = new RegExp(
      '(##диагональ##|##диагональ#)(.*?)(#)',
      '',
    );
    const aspectRegExp = new RegExp(
      '(##соотношениесторонЖК##|##соотношениесторонЖК#)(.*?)(#)',
      '',
    );
    const orientationRegExp = new RegExp(
      '(#Ориентация##|#Ориентация#)(.*?)(#)',
      '',
    );
    const heightRegExp = new RegExp(
      '(##высотакрепления##|##высотакрепления#)(.*?)(#)',
      '',
    );

    const lcdPlaceRegExp = new RegExp(
      '(##размещениеЖК##|##размещениеЖК#)(.*?)(#)',
      '',
    );

    const lcdSettingRegExp = new RegExp(
      '(##настройкаЖК##|##настройкаЖК#)(.*?)(#)',
      '',
    );
    const lcdStatusRegExp = new RegExp(
      '(##состояниеЖК##|##состояниеЖК#)(.*?)(#)',
      '',
    );

    const linkRegExp = new RegExp(
      'https://support.sberbank-service.ru([a-z/?=0-9*])+',
      '',
    );

    //Диспропорция изображения ##Есть диспропорция изображения
    //Состояние изображения ##Изображение на экране наезжаетна край матрицы
    //Наличие битых пикселей ##Есть битые пиксели

    const rs232 = new RegExp('(##RS232##|##RS232#)(.*?)(#)', '');

    const QRcode = new RegExp('(##QRкод##|##QRкод#)(.*?)(#)', '');

    //   const RegExp = new RegExp('()(.*?)(#)', '');

    for (const solution of solutions) {
      const text = solution.inventorySolution;

      const typeFound = await typeRegExp.exec(text);
      const tbFound = await tbRegExp.exec(text);
      const postFound = await postRegExp.exec(text);
      const floorFound = await floorRegExp.exec(text);
      const zoneFound = await zoneRegExp.exec(text);
      const cabinetFound = await cabinetRegExp.exec(text);
      const workplaceFound = await workplaceRegExp.exec(text);
      const nettopSerialFound = await nettopSerialRegExp.exec(text);
      const nettopNumberFound = await nettopNumberRegExp.exec(text);
      const nettopMakerFound = await nettopMakerRegExp.exec(text);
      const nettopModelFound = await nettopModelRegExp.exec(text);
      const nettopDomenFound = await nettopDomenRegExp.exec(text);
      const ipFound = await ipRegExp.exec(text);
      const macFound = await macRegExp.exec(text);
      const resFound = await resRegExp.exec(text);
      const lcdSerialFound = await lcdSerialRegExp.exec(text);
      const lcdNumberFound = await lcdNumberRegExp.exec(text);
      const lcdMakerFound = await lcdMakerlRegExp.exec(text);
      const lcdModelFound = await lcdModelRegExp.exec(text);
      const diagonalFound = await diagonalRegExp.exec(text);
      const aspectFound = await aspectRegExp.exec(text);
      const orientationFound = await orientationRegExp.exec(text);
      const heightFound = await heightRegExp.exec(text);
      const lcdPlaceFound = await lcdPlaceRegExp.exec(text);
      const lcdSettingFound = await lcdSettingRegExp.exec(text);
      const lcdStatusFound = await lcdStatusRegExp.exec(text);

      const linkFound = await linkRegExp.exec(text);
      const rs232Found = await rs232.exec(text);
      const QRcodeFound = await QRcode.exec(text);

      if (typeFound) solution.inventoryType = typeFound[2];
      if (tbFound) solution.inventoryTb = tbFound[2];
      if (postFound) solution.inventoryPostcode = postFound[2];
      if (floorFound) solution.inventoryFloor = floorFound[2];
      if (zoneFound) solution.inventoryZone = zoneFound[2];
      if (cabinetFound) solution.inventoryCabinet = cabinetFound[2];
      if (workplaceFound) solution.inventoryWorkplace = workplaceFound[2];
      if (nettopSerialFound)
        solution.inventoryNettopSerial = nettopSerialFound[2];
      if (nettopNumberFound)
        solution.inventoryNettopNumber = nettopNumberFound[2];
      if (nettopMakerFound) solution.inventoryNettopMaker = nettopMakerFound[2];
      if (nettopModelFound) solution.inventoryNettopModel = nettopModelFound[2];
      if (nettopDomenFound) solution.inventoryDomen = nettopDomenFound[2];
      if (ipFound) solution.inventoryIp = ipFound[2];
      if (macFound) solution.inventoryMac = macFound[2];
      if (resFound) solution.inventoryResolution = resFound[2];
      if (lcdSerialFound) solution.inventoryLcdSerial = lcdSerialFound[2];
      if (lcdNumberFound) solution.inventoryLcdNumber = lcdNumberFound[2];
      if (lcdMakerFound) solution.inventoryLcdMaker = lcdMakerFound[2];
      if (lcdModelFound) solution.inventoryLcdModel = lcdModelFound[2];
      if (diagonalFound) solution.inventoryLcdDiagonal = diagonalFound[2];
      if (aspectFound) solution.inventoryLcdAspectRation = aspectFound[2];
      if (orientationFound)
        solution.inventoryLcdOrientation = orientationFound[2];
      if (heightFound) solution.inventoryHeight = heightFound[2];
      if (lcdPlaceFound) solution.inventoryLcdPlace = lcdPlaceFound[2];
      if (lcdSettingFound) solution.inventoryLcdSetting = lcdSettingFound[2];
      if (lcdStatusFound) solution.inventoryLcdStatus = lcdStatusFound[2];
      if (text.includes('Есть диспропорция изображения'))
        solution.inventoryImageBalance = 'Есть диспропорция изображения';

      if (text.includes('Изображение на экране *наезжает* на край матрицы'))
        solution.inventoryImageStatus =
          'Изображение на экране наезжает на край матрицы';

      if (text.includes('Есть битые пиксели'))
        solution.inventoryBrokenPixel = 'Есть битые пиксели';

      if (rs232Found) solution.inventoryRs232Status = rs232Found[2];

      if (QRcodeFound) solution.inventoryQCode = QRcodeFound[2];

      if (linkFound) {
        solution.inventoryLink = linkFound[0];
      } else solution.inventoryLink = 'Ссылка не найдена';

      solution.inventoryParsed = 1;

      await this.roadmapService.repository.save(solution);
    }
  }

  /* Обновление данных о статусе устройстви из API */
  @Cron('0 */20 * * * *')
  async updateDataFromApi() {
    const entities = await this.mainService.repository.find();

    const res = await fetch(
      'https://api.eirs.ca.sbrf.ru/v4/public/devices/search?limit=50000',
      {
        method: 'post',
        agent: new https.Agent({
          rejectUnauthorized: false,
        }),
        headers: {
          'Content-Type': 'application/json',
          'X-API-Token': 'HNfFtIEVpQWgpuxXNbUYddEyVh0ccYqR',
        },
        body: JSON.stringify({}),
      },
    );
    const data = await res.json();

    /* Проходим по списку сущностей и обновляем данные */
    for (const entity of entities) {
      const found = data.data.find((v) => v.id == entity.number);

      if (found === undefined) {
        entity.status = 'Не найден';
      } else {
        entity.status = found.status;
        entity.address = found.address;
        entity.lastSeen = found.last_online;
        entity.playerVersion = found.version;
        entity.pcName = found.capabilities?.name;
        entity.os = found.capabilities?.os_version;
        entity.cpu = found.capabilities?.cpu_model;
      }
      await this.mainService.repository.save(entity);
    }

    /* СОхраняем дату*/
    const lastSync = await this.configService.getByOption('lastApiSyncDate');
    lastSync.dateValue = new Date();
    this.configService.repository.save(lastSync);
  }
}
