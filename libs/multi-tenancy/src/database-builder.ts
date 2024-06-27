import { MikroORM, Options } from '@mikro-orm/postgresql';

export const DatabaseConfigBuilder = async (config: Options) => {
  const conn = await MikroORM.init({
    ...config,
  });

  return conn;
};
