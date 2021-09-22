import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { SocketService } from '../../socket/socket.service';
import { RefreshRequestService } from './refresh-request.service';
import { Roles } from '../../auth/role.decorator';
import { ROLE } from '../../auth/roles.enum';
import GatewayEvents from '../../socket/types/gateway-events';
import { Socket } from 'socket.io';
import { RefreshRequestDto } from './types/refresh-request-dto';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '../../auth/ws-jwt.guard';
import { FileLoggerService } from '../../file-logger/file-logger.service';

@UseGuards(WsJwtGuard)
@WebSocketGateway()
export class RefreshRequestGateway {
  constructor(
    private readonly socketService: SocketService,
    private readonly service: RefreshRequestService,
    private readonly filelogger: FileLoggerService,
  ) {}

  @WebSocketServer() server;

  @Roles([ROLE.moder, ROLE.admin])
  @SubscribeMessage(GatewayEvents.USER_SEND_REFRESH_REQUEST)
  async handleUpdateTitle(
    client: Socket,
    data: RefreshRequestDto,
  ): Promise<void> {
    try {
      const user = this.socketService.getUser(client.id);

      const result = await this.service.create(user, data);
      client.emit(GatewayEvents.REFRESH_REQUEST_SUCCESS, result);
      client.emit(
        GatewayEvents.SUCCESS_MESSAGE,
        `Создание запросов успешно завершено`,
      );
    } catch (e) {
      client.emit(GatewayEvents.REFRESH_REQUEST_ERROR);
      client.emit(
        GatewayEvents.ERROR_MESSAGE,
        'Во время создания запросов произошла ошибка.',
      );
console.log(e);
      const user = this.socketService.getUser(client.id);
      this.filelogger.error(user, e);
    }
  }
}
