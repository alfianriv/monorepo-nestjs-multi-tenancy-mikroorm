import { Migration } from '@mikro-orm/migrations';

export class Migration20240623092741 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "Users" ("id" varchar(255) not null, "full_name" varchar(255) not null, constraint "Users_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "Users" cascade;');
  }

}
