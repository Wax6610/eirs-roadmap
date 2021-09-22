import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import {secretOrKey} from "../db.config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secretOrKey,
    });
  }

  async validate(payload: any) {
    /* Сделано так, из-за не совсем корректного json от сервера*/
    const name: string =
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';
    const role: string =
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';

    const [domain, account] = payload[name].split('\\');
    const info = await this.userService.findByUserDomain(payload[name]);

    return { domain, account, role: payload[role], info };
  }
}
