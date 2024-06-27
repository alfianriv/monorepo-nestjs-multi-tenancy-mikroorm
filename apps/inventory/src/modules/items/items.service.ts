import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { MultiSchemaService } from '@app/multi-tenancy';
import { ItemEntity } from './entities/item.entity';
import { DatabaseConfig } from '../../configs/database/database.config';
import { uid } from 'uid/secure';
import { PostgreSqlDriver, SqlEntityManager } from '@mikro-orm/postgresql';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class ItemsService extends MultiSchemaService<ItemEntity> {
  private readonly schema: string;
  constructor(@Inject(REQUEST) private request: Request) {
    super();
    this.setConfig({
      ...DatabaseConfig,
    });

    this.schema = `${this.request.headers['x-client']}_inventory`;
  }

  async create(data: CreateItemDto) {
    const user = new ItemEntity({ id: uid(16), ...data });
    const em = await this.getEm(this.schema);
    await em.persist(user).flush();
    return user;
  }

  async findAll() {
    const repo = await this.getRepository({
      entityName: ItemEntity.name,
      schema: this.schema,
    });
    return repo.findAll();
  }

  async findOne(
    id: string,
    options?: { em?: SqlEntityManager<PostgreSqlDriver> },
  ) {
    const repo = await this.getRepository({
      em: options?.em,
      entityName: ItemEntity.name,
      schema: this.schema,
    });
    const result = await repo.findOne({ id });
    if (!result) {
      throw new NotFoundException('Item not found');
    }
    return result;
  }

  async update(id: string, data: UpdateItemDto) {
    const em = await this.getEm(this.schema);
    em.begin();
    try {
      const item = await this.findOne(id, { em });
      Object.assign(item, data);
      em.flush();
      em.commit();
      return item;
    } catch (error) {
      em.rollback();
      throw error;
    }
  }

  async remove(id: string) {
    const em = await this.getEm(this.schema);
    em.begin();
    try {
      const item = await this.findOne(id, { em });
      em.remove(item);
      em.flush();
    } catch (error) {
      em.rollback();
      throw error;
    }
  }
}
