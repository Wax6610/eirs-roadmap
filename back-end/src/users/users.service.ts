import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, Repository } from 'typeorm';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users )
    private readonly usersRepository: Repository<Users>,
  ) {}

  /* Поиск пользователя по строке вида домен\логин*/
  async findByUserDomain(domainAccount: string): Promise<Users> {
    const query = this.usersRepository.createQueryBuilder();

    query.andWhere('domain_account = :domainAccount', { domainAccount });

    return await query.getOne();
  }
}
