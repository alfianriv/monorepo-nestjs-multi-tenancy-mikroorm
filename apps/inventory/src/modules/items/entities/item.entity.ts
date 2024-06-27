import { BaseEntity } from '@app/multi-tenancy/base-entity';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { SoftDeletable } from 'mikro-orm-soft-delete';
@SoftDeletable(() => ItemEntity, 'deletedAt', () => new Date())
@Entity({ tableName: 'Items' })
export class ItemEntity extends BaseEntity {
  @PrimaryKey()
  id!: string;

  @Property()
  name!: string;

  constructor(partial: Partial<ItemEntity>) {
    super();
    Object.assign(this, partial);
  }
}
