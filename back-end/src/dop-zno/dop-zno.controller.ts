import {Controller, Get} from '@nestjs/common';
import {DopZnoService} from "./dop-zno.service";

@Controller('dop-zno')
export class DopZnoController {
    constructor(private readonly service: DopZnoService) {}

    @Get('parse')
    parse(){
        this.service.parse()
    }
}
