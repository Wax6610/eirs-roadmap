import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { UseGuards } from '@nestjs/common';

import { WsJwtGuard } from './auth/ws-jwt.guard';
import { SocketService } from './socket/socket.service';
import GatewayEvents from './socket/types/gateway-events';
import { FileLoggerService } from './file-logger/file-logger.service';

@UseGuards(WsJwtGuard)
@WebSocketGateway()
export class AuthGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly socketService: SocketService,
    private readonly filelogger: FileLoggerService,
  ) {}
  @WebSocketServer() server;
  async handleConnection(client: Socket): Promise<void> {
    try {
      const token = client.handshake.query.token;
      if (token.length == 0) {
        client.disconnect();
        return;
      }

      await this.socketService.addUserToList(token, client.id);

      const list = this.socketService.getFullNames();

      client.emit(GatewayEvents.AUTH_SUCCESS, {
        user: this.socketService.getUserName(client.id),
        list,
      });

      this.server.emit(GatewayEvents.USER_LIST_UPDATED, list);
    } catch (e) {
      const user = this.socketService.getUser('no connection, no client id');
      this.filelogger.error(user, e);
    }
  }

  handleDisconnect(client: Socket): any {
    this.socketService.removeUserFromList(client.id);
    const list = this.socketService.getFullNames();
    this.server.emit(GatewayEvents.USER_LIST_UPDATED, list);
  }
}
