import { Migrator } from '@mikro-orm/migrations';
import { MikroORM, Options } from '@mikro-orm/postgresql';
import { DatabaseConfigBuilderInterface } from './definitions';

export const DatabaseConfigBuilder = async (
  config: DatabaseConfigBuilderInterface,
) => {
  const options: Options = {
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    dbName: config.dbName,
    debug: config.debug,
    entities: config.entities,
  };

  if (config.migrationPath) {
    options.migrations = {
      path: config.migrationPath,
    };
    options.extensions = [Migrator];
  }
  const conn = await MikroORM.init({
    ...options,
  });

  return conn;
};