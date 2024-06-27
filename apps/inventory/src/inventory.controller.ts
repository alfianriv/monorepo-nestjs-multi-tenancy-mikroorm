import { Controller, Get, Param } from '@nestjs/common';
import { InventoryService } from './inventory.service';

@Controller()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('__health')
  getHealth() {
    return this.inventoryService.getHealth();
  }

  @Get('__health/db')
  getHealthDb() {
    return this.inventoryService.getHealthDb();
  }

  @Get('db/migrate/:schema')
  migrate(@Param('schema') schema: string) {
    return this.inventoryService.migrate(schema);
  }
}
