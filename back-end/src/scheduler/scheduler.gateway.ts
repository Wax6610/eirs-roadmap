import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { SchedulerService } from './scheduler.service';
import { Roles } from '../auth/role.decorator';
import { ROLE } from '../auth/roles.enum';
import GatewayEvents from '../socket/types/gateway-events';
import { Socket } from 'socket.io';


@WebSocketGateway()
export class SchedulerGateway {
  @WebSocketServer() server;

  constructor(
    private readonly service: SchedulerService,
  ) {}

  @Roles([ROLE.moder, ROLE.admin])
  @SubscribeMessage(GatewayEvents.UPDATE_KEYWORDS)
  async updateKeywords(client: Socket): Promise<void> {
    try {

    } catch (e) {
      console.log(e);
    }
  }
}
