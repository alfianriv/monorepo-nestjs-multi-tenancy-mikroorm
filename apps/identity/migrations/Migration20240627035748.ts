import { Migration } from '@mikro-orm/migrations';

export class Migration20240627035748 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "Users" ("id" varchar(255) not null, "createdAt" timestamptz not null, "updatedAt" timestamptz not null, "deletedAt" timestamptz null, "fullName" varchar(255) not null, constraint "Users_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "Users" cascade;');
  }

}
