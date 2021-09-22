import { Injectable } from '@nestjs/common';
import { MainView } from './main-view.entity';
import { FindManyOptions, In, IsNull, Like, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import GetViewRequest from './types/get-view-request';
import { CountDevicesForPfDto } from './types/count-devices-for-pf-dto';
import * as Excel from 'exceljs';
import { createReadStream } from 'fs';
/*
* 
* @Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users, 'qmsConnection')
    private readonly usersRepository: Repository<Users>,
  ) {}*/
@Injectable()
export class MainViewService {
  constructor(
    @InjectRepository(MainView)
    private readonly repository: Repository<MainView>,
  ) {}

  find(filterNum: number) {
    return this.repository.find({
      order: { number: 'ASC' },
    });
  }

  async getBySerial(serial: number[]): Promise<MainView[]> {
    return this.repository.find({ number: In(serial) });
  }


}
