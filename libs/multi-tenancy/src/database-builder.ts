import { Migrator } from '@mikro-orm/migrations';
import { MikroORM, Options } from '@mikro-orm/postgresql';

export const DatabaseConfigBuilder = async (
  config: Options,
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

  const conn = await MikroORM.init({
    ...options,
  });

  return conn;
};
