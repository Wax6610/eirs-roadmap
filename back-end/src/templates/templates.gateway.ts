import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '../auth/ws-jwt.guard';
import { SocketService } from '../socket/socket.service';
import { Roles } from '../auth/role.decorator';
import { ROLE } from '../auth/roles.enum';
import { Socket } from 'socket.io';
import GatewayEvents from '../socket/types/gateway-events';
import { TemplatesService } from './templates.service';
import SaveTemplateDto from './types/save-template-dto';
import {FileLoggerService} from "../file-logger/file-logger.service";

@UseGuards(WsJwtGuard)
@WebSocketGateway()
export class TemplatesGateway {
  constructor(
    private readonly socketService: SocketService,
    private readonly templatesService: TemplatesService,
    private readonly filelogger: FileLoggerService,
  ) {}
  @WebSocketServer() server;

  /* Обновление текста или заголовка */
  @Roles([ROLE.moder, ROLE.admin])
  @SubscribeMessage(GatewayEvents.USER_ASK_TEMPLATES)
  async handleUpdateTitle(client: Socket, data: any): Promise<void> {
    try {
      const templates = await this.templatesService.all();
      client.emit(GatewayEvents.SERVER_SEND_TEMPLATES, templates);
    } catch (e) {
      setTimeout(() => {
        client.emit(
          GatewayEvents.ERROR_MESSAGE,
          'В загрузке шаблонов произошла ошибка',
        );
      }, 5000);
      const user = this.socketService.getUser(client.id);
      this.filelogger.error(user, e);
    }
  }

  /* Сохранение шаблона */
  @Roles([ROLE.moder, ROLE.admin])
  @SubscribeMessage(GatewayEvents.USER_ASK_SAVE_TEMPLATE)
  async save(client: Socket, data: SaveTemplateDto): Promise<void> {
    try {
      const res = await this.templatesService.save(data);
      this.server.emit(GatewayEvents.SERVER_SEND_TEMPLATE_AFTER_SAVE, res);
      client.emit(GatewayEvents.SUCCESS_MESSAGE, 'Шаблон успешно сохранен');
      client.emit(GatewayEvents.SAVE_TEMPLATE_SUCCESS);
    } catch (e) {
      client.emit(GatewayEvents.SAVE_TEMPLATE_ERROR);
      client.emit(
        GatewayEvents.ERROR_MESSAGE,
        'При сохранении шаблона произошла ошибка',
      );

      const user = this.socketService.getUser(client.id);
      this.filelogger.error(user, e);
    }
  }
}
