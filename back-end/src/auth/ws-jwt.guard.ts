import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { JWT } from 'jose';
import { Reflector } from '@nestjs/core';
import {secretOrKey} from "../db.config";

@Injectable()
export class WsJwtGuard {
  constructor(private reflector: Reflector) {}

  async canActivate(context: any): Promise<boolean> {
    try {
      const roles = this.reflector.get<string[]>('roles', context.getHandler());

      /* Если список ролей пуст, значит проверка не требуется. ПРопускаем все остальное*/
      if (!roles) {
        return true;
      }

      const token = context.args[0].handshake.query.token;

      const decoded = JWT.verify(token, secretOrKey);

      /* Поидее verify прервет выполнение сама, но на всякий делаем поверку что токен прошел проверку и  данные расшифрованы*/
      if (!decoded) return false;

      // Косяк сервиса, ничегоне поделать
      const role: string =
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';


      // Если в списке ролей есть текущая роль пользователя, то даем добро
      return roles.filter((r) => r === decoded[role]).length > 0;
    } catch (err) {
      throw new WsException(err.message);
    }
  }
}
