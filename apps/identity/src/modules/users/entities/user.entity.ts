import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'Users' })
export class UserEntity {
  @PrimaryKey()
  id!: string;

  @Property()
  fullName!: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
