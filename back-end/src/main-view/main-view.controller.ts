import { Controller, Get, Header, Res } from '@nestjs/common';
import { MainViewService } from './main-view.service';

@Controller('')
export class MainViewController {
  constructor(private readonly service: MainViewService) {}



}
