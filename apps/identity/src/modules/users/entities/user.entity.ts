import { BaseEntity } from '@app/multi-tenancy/base-entity';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { SoftDeletable } from 'mikro-orm-soft-delete';

@SoftDeletable(() => UserEntity, 'deletedAt', () => new Date())
@Entity({ tableName: 'Users' })
export class UserEntity extends BaseEntity {
  @PrimaryKey()
  id!: string;

  @Property()
  fullName!: string;

  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }
}
