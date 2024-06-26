import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { uid } from 'uid/secure';
import { PostgreSqlDriver, SqlEntityManager } from '@mikro-orm/postgresql';
import { MultiSchemaService } from '@app/multi-tenancy';
import { DatabaseConfig } from '../../configs/database/database.config';

@Injectable()
export class UsersService extends MultiSchemaService {
  constructor() {
    super();
    this.setConfig(DatabaseConfig);
  }

  async create(data: CreateUserDto) {
    const user = new UserEntity({ id: uid(16), ...data });
    const em = await this.getEm();
    await em.persist(user).flush();
    return user;
  }

  async findAll() {
    const repo = await this.getRepository({ entityName: UserEntity.name });
    return repo.findAll();
  }

  async findOne(
    id: string,
    options?: { em?: SqlEntityManager<PostgreSqlDriver> },
  ) {
    const repo = await this.getRepository({
      em: options?.em,
      entityName: UserEntity.name,
    });
    const result = await repo.findOne({ id });
    if (!result) {
      throw new NotFoundException('User not found');
    }
    return result;
  }

  async update(id: string, data: UpdateUserDto) {
    const em = await this.getEm();
    em.begin();
    try {
      const user = await this.findOne(id, { em });
      Object.assign(user, data);
      em.flush();
      em.commit();
    } catch (error) {
      em.rollback();
      throw error;
    }
  }

  async remove(id: string) {
    const em = await this.getEm();
    em.begin();
    try {
      const user = await this.findOne(id, { em });
      em.remove(user);
      em.commit();
    } catch (error) {
      em.rollback();
      throw error;
    }
  }
}
