import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '../../auth/ws-jwt.guard';
import { SocketService } from '../../socket/socket.service';
import { FileLoggerService } from '../../file-logger/file-logger.service';
import { VipRequestService } from './vip-request.service';
import { Roles } from '../../auth/role.decorator';
import { ROLE } from '../../auth/roles.enum';
import GatewayEvents from './types/gateway-events';
import AllGatewayEvents from '../../socket/types/gateway-events';
import { Socket } from 'socket.io';
import { RefreshRequestDto } from './types/refresh-request-dto';

@UseGuards(WsJwtGuard)
@WebSocketGateway()
export class VipRequestGateway {
  constructor(
    private readonly socketService: SocketService,
    private readonly service: VipRequestService,
    private readonly filelogger: FileLoggerService,
  ) {}

  @WebSocketServer() server;

  @Roles([ROLE.moder, ROLE.admin])
  @SubscribeMessage(GatewayEvents.VIP_REQUEST)
  async handleUpdateTitle(
    client: Socket,
    data: RefreshRequestDto,
  ): Promise<void> {
    try {
      const user = this.socketService.getUser(client.id);
      console.log(data,GatewayEvents.VIP_REQUEST);
      const result = await this.service.create(user, data);
      client.emit(GatewayEvents.VIP_REQUEST_SUCCESS, result);
      client.emit(
        AllGatewayEvents.SUCCESS_MESSAGE,
        `Создание запросов успешно завершено`,
      );
    } catch (e) {
      client.emit(GatewayEvents.VIP_REQUEST_FAILED);
      client.emit(
        AllGatewayEvents.ERROR_MESSAGE,
        'Во время создания запросов произошла ошибка.',
      );
      console.log(e);
      const user = this.socketService.getUser(client.id);
      this.filelogger.error(user, e);
    }
  }
}
