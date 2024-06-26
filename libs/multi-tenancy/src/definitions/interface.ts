export class DatabaseConfigBuilderInterface {
  host: string;
  port: number;
  user: string;
  password: string;
  dbName: string;
  entities?: any[];
  debug?: boolean;
  migrationPath?: string;
}
