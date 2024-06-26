import { configDotenv } from 'dotenv';
import { DatabaseConfigBuilderInterface } from 'mikroorm-multi-schema';
import { UserEntity } from '../modules/users/entities/user.entity';

configDotenv();

export const databaseBuilder = (): DatabaseConfigBuilderInterface => {
  return {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    entities: [UserEntity],
    debug: true
  };
};
