import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { SocketService } from '../socket/socket.service';

import { FileLoggerService } from '../file-logger/file-logger.service';
import { RoadmapService } from './roadmap.service';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '../auth/ws-jwt.guard';
import { Roles } from '../auth/role.decorator';
import { ROLE } from '../auth/roles.enum';
import GatewayEvents from '../socket/types/gateway-events';
import { Socket } from 'socket.io';
import { SaveFieldDto } from './types/save-field-dto';

@UseGuards(WsJwtGuard)
@WebSocketGateway()
export class RoadmapGateway {
  @WebSocketServer() server;

  constructor(
    private readonly socketService: SocketService,
    private readonly service: RoadmapService,
    private readonly filelogger: FileLoggerService,
  ) {}

  /* Сохранение поля*/
  @Roles([ROLE.moder, ROLE.admin])
  @SubscribeMessage(GatewayEvents.SAVE_ROADMAP)
  async handleSave(client: Socket, data: SaveFieldDto): Promise<void> {
    try {
      this.service.save(data);
      client.emit(GatewayEvents.SUCCESS_MESSAGE, 'Данные успешно сохранены');
    } catch (e) {
      client.emit(
        GatewayEvents.ERROR_MESSAGE,
        'Во время сохранения произошла ошибка.',
      );
      const user = this.socketService.getUser(client.id);
      this.filelogger.error(user, e);
    }
  }
}
