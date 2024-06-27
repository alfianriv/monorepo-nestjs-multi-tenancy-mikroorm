import { configDotenv } from 'dotenv';
import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { InventoryEntities } from '../../commons/entities';
import { Options as SequelizedOptions } from 'sequelize';
configDotenv();

export const DatabaseConfig: Options = {
  driver: PostgreSqlDriver,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  entities: [...InventoryEntities],
  debug: true,
  migrations: {
    path: './apps/inventory/migrations',
    snapshot: true,
    snapshotName: 'inventory',
  },
  extensions: [Migrator],
};

export const DatabaseConfigSequelize: SequelizedOptions = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};
