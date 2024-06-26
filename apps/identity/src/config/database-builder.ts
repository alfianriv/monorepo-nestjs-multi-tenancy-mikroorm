import { Migrator } from "@mikro-orm/migrations";
import { MikroORM } from "@mikro-orm/postgresql";
import { DatabaseConfigBuilderInterface } from "./definitions";

export const DatabaseConfigBuilder = async (
  config: DatabaseConfigBuilderInterface
) => {
  const conn = await MikroORM.init({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    dbName: config.dbName,
    debug: config.debug,
    entities: config.entities,
    // migrations: config?.migrationPath
    //   ? {
    //       path: config.migrationPath,
    //     }
    //   : null,
    // extensions: config?.migrationPath ? [Migrator] : null,
  });

  return conn;
};
