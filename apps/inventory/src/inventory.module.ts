import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { ItemsModule } from './modules/items/items.module';

@Module({
  imports: [ItemsModule],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
