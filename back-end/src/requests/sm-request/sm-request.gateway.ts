import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { SocketService } from '../../socket/socket.service';
import { RefreshRequestService } from '../refresh-request/refresh-request.service';
import { SmRequestService } from './sm-request.service';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '../../auth/ws-jwt.guard';
import { Roles } from '../../auth/role.decorator';
import { ROLE } from '../../auth/roles.enum';
import GatewayEvents from '../../socket/types/gateway-events';
import { Socket } from 'socket.io';
import { RefreshRequestDto } from '../refresh-request/types/refresh-request-dto';
import { FileLoggerService } from '../../file-logger/file-logger.service';

@UseGuards(WsJwtGuard)
@WebSocketGateway()
export class SmRequestGateway {
  constructor(
    private readonly socketService: SocketService,
    private readonly service: SmRequestService,
    private readonly filelogger: FileLoggerService,
  ) {}

  @WebSocketServer() server;

  @Roles([ROLE.moder, ROLE.admin])
  @SubscribeMessage(GatewayEvents.GET_SM_REQUEST)
  async handleUpdateTitle(
    client: Socket,
    data: RefreshRequestDto,
  ): Promise<void> {
    try {
      const result = await this.service.all();
      client.emit(GatewayEvents.GET_SM_REQUEST_SUCCESS, result);
      client.emit(
        GatewayEvents.SUCCESS_MESSAGE,
        'Информация успешно загружена',
      );
    } catch (e) {
      client.emit(GatewayEvents.GET_SM_REUQEST_FAILED);
      client.emit(
        GatewayEvents.ERROR_MESSAGE,
        'Во время загрузки произошла ошибка.',
      );

      const user = this.socketService.getUser(client.id);
      this.filelogger.error(user, e);
    }
  }
}
