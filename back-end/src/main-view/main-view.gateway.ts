import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { SocketService } from '../socket/socket.service';
import { Roles } from '../auth/role.decorator';
import { ROLE } from '../auth/roles.enum';
import GatewayEvents from '../socket/types/gateway-events';
import { Socket } from 'socket.io';
import { MainViewService } from './main-view.service';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '../auth/ws-jwt.guard';
import { FileLoggerService } from '../file-logger/file-logger.service';
import { ConfigService } from '../config/config.service';

@UseGuards(WsJwtGuard)
@WebSocketGateway()
export class MainViewGateway {
  constructor(
    private readonly socketService: SocketService,
    private readonly service: MainViewService,
    private readonly filelogger: FileLoggerService,
    private readonly configService: ConfigService,
  ) {}
  @WebSocketServer() server;

  @Roles([ROLE.moder, ROLE.admin])
  @SubscribeMessage(GatewayEvents.USER_ASK_MAIN_VIEW)
  async get(client: Socket, data: any): Promise<void> {
    try {
      const res = await this.service.find(data);

      client.emit(GatewayEvents.LOAD_MAIN_VIEW_SUCCESS, res);

      // Дата обновления
      const apiSyncDate = await this.configService.getByOption(
        'lastApiSyncDate',
      );
      const dbSyncDate = await this.configService.getByOption('lastDBSyncDate');
      client.emit(GatewayEvents.SYNC_DATE_LOADED, {
        apiSyncDate,
        dbSyncDate,
      });

      // client.emit(GatewayEvents.SUCCESS_MESSAGE, `Данные успешно загружены.`);
    } catch (e) {
      client.emit(GatewayEvents.LOAD_MAIN_VIEW_ERROR);
      client.emit(
        GatewayEvents.ERROR_MESSAGE,
        'Во время загрузки произошла ошибка',
      );
      const user = this.socketService.getUser(client.id);
      this.filelogger.error(user, { e, data });
    }
  }
}
