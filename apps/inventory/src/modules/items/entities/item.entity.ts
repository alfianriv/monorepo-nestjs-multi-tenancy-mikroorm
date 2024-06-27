import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'Items' })
export class ItemEntity {
  @PrimaryKey()
  id!: string;

  @Property()
  name!: string;
}
