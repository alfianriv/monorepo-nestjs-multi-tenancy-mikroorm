import { configDotenv } from 'dotenv';
import { UserEntity } from '../../modules/users/entities/user.entity';
import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
configDotenv();

export const DatabaseConfig: Options = {
  driver: PostgreSqlDriver,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  entities: [UserEntity],
  debug: true,
  migrations: {
    path: './apps/identity/migrations',
  },
  extensions: [Migrator],
};
