import { Injectable } from '@nestjs/common';
import {
  Options,
  PostgreSqlDriver,
  SqlEntityManager,
} from '@mikro-orm/postgresql';
import { DatabaseConfigBuilder } from './database-builder';
import { DatabaseConfigSequelize } from 'apps/inventory/src/configs/database/database.config';
import { SequelizeStorage, Umzug } from 'umzug';
import { QueryInterface, Sequelize } from 'sequelize';
import 'ts-node/register';
@Injectable()
export class MultiSchemaService<T extends object> {
  private config: Options;

  async getRepository(options: {
    schema?: string;
    em?: SqlEntityManager<PostgreSqlDriver>;
    entityName: string;
  }) {
    let em: SqlEntityManager<PostgreSqlDriver>;
    if (options?.em) {
      return options.em.getRepository<T>(options.entityName);
    }
    em = await this.getEm(options?.schema);
    return em.getRepository<T>(options.entityName);
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

  async migrate(schema: string) {
    this.checkConfig();
    const conn = await DatabaseConfigBuilder({
      ...this.config,
      migrations: {
        path: '../blank',
      },
      schema,
    });
    const db = conn;
    try {
      const migrator = db.getMigrator();
      await migrator.up({});
      const sequelize = new Sequelize({ ...DatabaseConfigSequelize, schema });
      const umzug = new Umzug({
        migrations: {
          glob: './apps/inventory/migrations/*.ts',
        },
        storage: new SequelizeStorage({ sequelize, schema }),
        logger: console,
        context: { queryInterface: sequelize.getQueryInterface(), schema },
      });
      await umzug.runAsCLI(['up']);
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
