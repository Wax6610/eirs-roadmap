import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [SocketService],
  imports: [UsersModule],
  exports: [SocketService],
})
export class SocketModule {}
