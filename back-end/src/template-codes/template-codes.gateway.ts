import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { SocketService } from '../socket/socket.service';
import { TemplateCodesService } from './template-codes.service';
import { Roles } from '../auth/role.decorator';
import { ROLE } from '../auth/roles.enum';
import GatewayEvents from '../socket/types/gateway-events';
import { Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '../auth/ws-jwt.guard';
import { FileLoggerService } from '../file-logger/file-logger.service';

@UseGuards(WsJwtGuard)
@WebSocketGateway()
export class TemplateCodesGateway {
  constructor(
    private readonly socketService: SocketService,
    private readonly service: TemplateCodesService,
    private readonly filelogger: FileLoggerService,
  ) {}
  @WebSocketServer() server;

  /* Обновление текста или заголовка */
  @Roles([ROLE.moder, ROLE.admin])
  @SubscribeMessage(GatewayEvents.USER_ASK_TEMPLATE_CODES)
  async handleUpdateTitle(client: Socket, data: any): Promise<void> {
    try {
      const data = await this.service.all();

      client.emit(GatewayEvents.SERVER_SEND_TEMPLATE_CODES, data);
    } catch (e) {
      const user = this.socketService.getUser(client.id);
      this.filelogger.error(user, e);

      setTimeout(() => {
        client.emit(
          GatewayEvents.ERROR_MESSAGE,
          'В загрузке кодов для шаблона произошла ошибка',
        );
      }, 5000);
    }
  }
}
