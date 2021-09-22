import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Users } from '../users/users.entity';
import {logPath} from "../db.config";

@Injectable()
export class FileLoggerService {
  enabled = true;
  private path;
  constructor() {
    this.path = logPath;
  }
  // path = 'C:/Users/samoylenko-vs/Desktop/arm_roadmap/back-end/logs/';

  public error(user: Users, req: unknown) {
    const message = this.getMessage(req);
    const username = this.getUsername(user);

    const path = this.path + username;

    if (!fs.existsSync(path)) fs.mkdirSync(path);
    fs.appendFile(`${path}/error.txt`, message, (err) => {
      // console.log(err);
    });
  }

  private getUsername(user: Users | null) {
    if (!user) return 'unknown';
    const username = user.domainAccount.split('\\');

    if (username.length != 2) return 'unknown';
    else return username[1];
  }
  private getMessage(req: unknown) {
    const message = JSON.stringify(req, null, '\t');
    const date = new Date().toString();
    const eol = '\r\n';
    return `Время : ${date}${eol}Данные : ${message}${eol}${eol}${eol}${eol}`;
  }
}
