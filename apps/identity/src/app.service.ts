import { Injectable } from '@nestjs/common';
import { DatabaseConfig } from './configs/database/database.config';
import { MultiSchemaService } from '@app/multi-tenancy';

@Injectable()
export class AppService extends MultiSchemaService {
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
