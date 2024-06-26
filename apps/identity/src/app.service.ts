import { Injectable } from '@nestjs/common';
import { databaseBuilder } from './config/database.config';
import { MultiSchemaService } from 'mikroorm-multi-schema';

@Injectable()
export class AppService extends MultiSchemaService {
  constructor() {
    super();
    this.setConfig(databaseBuilder());
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
