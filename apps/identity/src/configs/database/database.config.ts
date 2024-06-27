import { configDotenv } from 'dotenv';
import {
  EntityCaseNamingStrategy,
  Options,
  PostgreSqlDriver,
} from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { IdentityEntities } from '../../commons/entities';
configDotenv();

export const DatabaseConfig: Options = {
  driver: PostgreSqlDriver,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  entities: [...IdentityEntities],
  debug: true,
  migrations: {
    path: './apps/identity/migrations',
    snapshot: true,
    snapshotName: 'identity',
  },
  extensions: [Migrator],
  namingStrategy: EntityCaseNamingStrategy,
};
