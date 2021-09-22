import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {IsNull, Not, Repository} from 'typeorm';
import { DopZnoEntity } from './dop-zno.entity';

@Injectable()
export class DopZnoService {
  constructor(
    @InjectRepository(DopZnoEntity)
    private readonly repository: Repository<DopZnoEntity>,
  ) {}

  async parse() {
    const entities = await this.repository.find({
      inventoryParsed: IsNull(),
      inventoryDate : Not(IsNull())
    });

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

    for (const solution of entities) {
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

      await this.repository.save(solution);
    }
  }
}
