import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JWT } from 'jose';
import { UserListDto } from './types/user-list-dto';

@Injectable()
export class SocketService {
  private userList: UserListDto[] = [];
  constructor(private readonly userService: UsersService) {}

  async addUserToList(token: string, socketId: string) {
    const decoded = JWT.decode(token);
    const name: string =
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';

    const user = await this.userService.findByUserDomain(decoded[name]);

    this.userList.push({
      socketId,
      user,
    });
  }

  getUser(socketId: string) {
    const user = this.userList.find((list) => list.socketId === socketId);

    if (user) return user.user;
    else return null;
  }

  getUserName(socketId: string) {
    const user = this.userList.find((list) => list.socketId === socketId);
    if (user.user) {
      return user.user.fullname;
    } else 'Пользователь не определен';
  }

  removeUserFromList(socketId: string) {
    this.userList = this.userList.filter((list) => list.socketId !== socketId);
  }

  getFullNames = () => {
    const names = this.userList.map(
      (v) => v.user?.fullname || 'Пользователь не определен',
    );

    const set = new Set(names);
    return Array.from(set);
  };
}
