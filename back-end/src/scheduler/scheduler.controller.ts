import { Controller, Get, HttpService } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { VipVspService } from '../vip-vsp/vip-vsp.service';

@Controller('scheduler')
export class SchedulerController {
  constructor(private readonly service: SchedulerService) {}

  @Get('parse-inventory')
  test(): any {
    console.log('test');
    return this.service.parseInventorySolutions();
    // return this.service.confirm();
  }

  @Get('update-from-api')
  testApi(): any {
    console.log('test-api');
    return this.service.updateDataFromApi();
    // return this.service.confirm();
  }

}
