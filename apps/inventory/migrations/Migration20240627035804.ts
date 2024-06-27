import { Migration } from '@mikro-orm/migrations';

export class Migration20240627035804 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "Items" ("id" varchar(255) not null, "createdAt" timestamptz not null, "updatedAt" timestamptz not null, "deletedAt" timestamptz null, "name" varchar(255) not null, constraint "Items_pkey" primary key ("id"));',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "Items" cascade;');
  }
}

export const up = async ({ context: { queryInterface, schema } }) => {
  await queryInterface.sequelize.query(
    `create table "${schema}"."Items" ("id" varchar(255) not null, "createdAt" timestamptz not null, "updatedAt" timestamptz not null, "deletedAt" timestamptz null, "name" varchar(255) not null, constraint "Items_pkey" primary key ("id"));`,
  );
};

export const down = async ({ context: { queryInterface, schema } }) => {
  await queryInterface.sequelize.query(
    `drop table if exists "${schema}"."Items" cascade;`,
  );
};
