import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MainView } from '../main-view/main-view.entity';
import { Repository } from 'typeorm';
import { TbGroupEntity } from './tb-group.entity';

@Injectable()
export class TbGroupsService {
  constructor(
    @InjectRepository(TbGroupEntity)
    private readonly repository: Repository<TbGroupEntity>,
  ) {}

  all() {
    return this.repository.find();
  }

  getByShortName(shortName: string) {
    return this.repository.find({
      shortName,
    });
  }
}
