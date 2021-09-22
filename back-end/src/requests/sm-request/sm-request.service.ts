import { Injectable, UseGuards } from '@nestjs/common';

import { SmRequestRepository } from './sm-request.repository';
import { CreateRequestDto } from './types/create-request-dto';
import { Cron } from '@nestjs/schedule';
import { RoadmapService } from '../../roadmap/roadmap.service';


@Injectable()
export class SmRequestService {
  constructor(private readonly repository: SmRequestRepository) {}

  create(data: CreateRequestDto[]) {
    return this.repository.save(data);
  }

  all() {
    return this.repository.find({
      order: {
        timestamp: 'DESC',
      },
    });
  }
}
