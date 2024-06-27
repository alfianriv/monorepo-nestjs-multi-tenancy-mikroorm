import { MultiSchemaService } from '@app/multi-tenancy';
import { Injectable } from '@nestjs/common';
import { DatabaseConfig } from './configs/database/database.config';
import { ItemEntity } from './modules/items/entities/item.entity';

@Injectable()
export class InventoryService extends MultiSchemaService<ItemEntity> {
  constructor() {
    super();
    this.setConfig(DatabaseConfig);
  }
  getHealth() {
    return {
      ok: true,
    };
  }

  async getHealthDb() {
    try {
      const conn = await this.getConn();
      conn.isConnected();
      return {
        ok: true,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
      };
    }
  }
}
