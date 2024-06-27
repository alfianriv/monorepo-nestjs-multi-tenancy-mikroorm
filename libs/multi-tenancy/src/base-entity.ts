import {
  BaseEntity as BaseEntityPostgres,
  Property,
} from '@mikro-orm/postgresql';

export class BaseEntity extends BaseEntityPostgres {
  @Property({ type: 'timestamptz' })
  createdAt = new Date();

  @Property({ type: 'timestamptz', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ nullable: true, type: 'timestamptz' })
  deletedAt?: Date;
}
