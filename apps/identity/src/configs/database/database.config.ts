import { configDotenv } from 'dotenv';
import { UserEntity } from '../../modules/users/entities/user.entity';
import { DatabaseConfigBuilderInterface } from '@app/multi-tenancy';
configDotenv();

export const DatabaseConfig: DatabaseConfigBuilderInterface = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  entities: [UserEntity],
  debug: true,
};
