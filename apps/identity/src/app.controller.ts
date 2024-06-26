import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('__health')
  getHealth() {
    return this.appService.getHealth();
  }

  @Get('__health/db')
  getHealthDb() {
    return this.appService.getHealthDb();
  }
}
