import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { ItemsModule } from './modules/items/items.module';
import { XclientMiddleware } from './middlewares/x-client.middleware';

@Module({
  imports: [ItemsModule],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(XclientMiddleware).forRoutes('*');
  }
}
