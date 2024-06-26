import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { configDotenv } from 'dotenv';
import { UserEntity } from './src/modules/users/entities/user.entity';
import { Migrator } from '@mikro-orm/migrations';
import { IdentityEntities } from './commons/entities';
configDotenv();

const config: Options = {
  driver: PostgreSqlDriver,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  dbName: process.env.DB_NAME,
  entities: IdentityEntities,
  migrations: {
    path: './apps/identity/migrations',
  },
};

export default {
  ...config,
  extensions: [Migrator],
};
