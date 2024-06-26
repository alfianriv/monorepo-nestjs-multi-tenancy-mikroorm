import { Injectable } from '@nestjs/common';
import {
  Options,
  PostgreSqlDriver,
  SqlEntityManager,
} from '@mikro-orm/postgresql';
import { DatabaseConfigBuilder } from './database-builder';

@Injectable()
export class MultiSchemaService {
  private config: Options;

  async getRepository(options: {
    schema?: string;
    em?: SqlEntityManager<PostgreSqlDriver>;
    entityName: string;
  }) {
    let em: SqlEntityManager<PostgreSqlDriver>;
    if (options?.em) {
      return options.em.getRepository(options.entityName);
    }
    em = await this.getEm(options?.schema);
    return em.getRepository(options.entityName);
  }

  async getEm(schema?: string) {
    const conn = await this.getConn();
    return conn.em.fork({ schema: schema || 'public' });
  }

  async getConn() {
    this.checkConfig();
    const conn = DatabaseConfigBuilder(this.config);
    const db = await conn;
    try {
      return db;
    } catch (error) {
      throw error;
    } finally {
      if (db.isConnected()) {
        db.close();
      }
    }
  }

  async migrate() {
    this.checkConfig();
    const conn = await DatabaseConfigBuilder({
      ...this.config,
    });
    const db = conn;
    try {
      db.migrator.up();
    } catch (error) {
      throw error;
    } finally {
      if (db.isConnected()) {
        db.close();
      }
    }
  }

  setConfig(config: Options) {
    this.config = config;
  }

  checkConfig() {
    if (!this.config) {
      throw Error(`Must set config using function setConfig`);
    }
  }
}
