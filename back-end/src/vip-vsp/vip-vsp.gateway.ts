import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Roles } from '../auth/role.decorator';
import { ROLE } from '../auth/roles.enum';
import GatewayEvents from './types/gateway-events';
import AllGatewayEvents from '../socket/types/gateway-events';
import { Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '../auth/ws-jwt.guard';
import { SocketService } from '../socket/socket.service';
import { FileLoggerService } from '../file-logger/file-logger.service';
import { VipVspService } from './vip-vsp.service';
import { SaveFieldDto } from './types/save-field-dto';

@UseGuards(WsJwtGuard)
@WebSocketGateway()
export class VipVspGateway {
  constructor(
    private readonly socketService: SocketService,
    private readonly service: VipVspService,
    private readonly filelogger: FileLoggerService,
  ) {}
  @WebSocketServer() server;

  @Roles([ROLE.moder, ROLE.admin])
  @SubscribeMessage(GatewayEvents.IMPORT_VIP)
  async import(client: Socket, data: any): Promise<void> {
    try {
      /* Импортируем данные*/
      const res = await this.service.import(data);

      if (res === false) {
        client.emit(GatewayEvents.IMPORT_VIP_FAILED);

        client.emit(
          AllGatewayEvents.ERROR_MESSAGE,
          'Неверный файл. Скачайте образец и импортируйте с помощью него',
        );
      } else {
        /* Получаем записи из view на основе новых ID и ID записей, которые были обновлены*/
        client.emit(GatewayEvents.IMPORT_VIP_SUCCESS);
        client.emit(
          AllGatewayEvents.SUCCESS_MESSAGE,
          `Список успешно загружен. Добавлено: ${res.created}. Обновлено: ${res.updated}. Пропущено: ${res.ignored}`,
        );
      }
    } catch (e) {
      console.log(e);
      client.emit(GatewayEvents.IMPORT_VIP_FAILED);
      client.emit(
        AllGatewayEvents.ERROR_MESSAGE,
        'В загрузке произошла ошибка',
      );

      const user = this.socketService.getUser(client.id);
      this.filelogger.error(user, e);
    }
  }

  @Roles([ROLE.moder, ROLE.admin])
  @SubscribeMessage(GatewayEvents.LOAD_VIP)
  async get(client: Socket, data: any): Promise<void> {
    try {
      const res = await this.service.find();

      client.emit(GatewayEvents.LOAD_VIP_SUCCESS, res);
      // client.emit(GatewayEvents.SUCCESS_MESSAGE, `Данные успешно загружены.`);
    } catch (e) {
      client.emit(GatewayEvents.LOAD_VIP_FAILED);
      client.emit(
        AllGatewayEvents.ERROR_MESSAGE,
        'Во время загрузки произошла ошибка',
      );
      const user = this.socketService.getUser(client.id);
      this.filelogger.error(user, { e, data });
    }
  }

  //--------------------

  /* Сохранение поля*/
  @Roles([ROLE.moder, ROLE.admin])
  @SubscribeMessage(GatewayEvents.UPDATE_VIP)
  async handleSave(client: Socket, data: SaveFieldDto): Promise<void> {
    try {
      await this.service.saveField(data);
      client.emit(AllGatewayEvents.SUCCESS_MESSAGE, 'Данные успешно сохранены');
    } catch (e) {
      client.emit(
        AllGatewayEvents.ERROR_MESSAGE,
        'Во время сохранения произошла ошибка.',
      );
      const user = this.socketService.getUser(client.id);
      this.filelogger.error(user, e);
    }
  }
}
