import { Options } from '@mikro-orm/postgresql';
import { configDotenv } from 'dotenv';
import { DatabaseConfig } from './src/configs/database/database.config';
configDotenv();

const config: Options = DatabaseConfig;

export default config;
