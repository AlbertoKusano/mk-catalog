import { Repository } from 'typeorm';

import { BaseEntity } from '../../../domain/entities/base.entity';
import { CommandRepository } from '../../../domain/repositories/sql/command.repository';
import { BaseRepositoryAdapter } from './base-repository.adapter';

export abstract class CommandRepositoryAdapter<Entity extends BaseEntity>
  extends BaseRepositoryAdapter<Entity>
  implements CommandRepository<Entity>
{
  protected constructor() {
    super();
  }

  create(obj: Entity): Promise<Entity> {
    const create = this.repository.create(obj);
    return this.repository.save(create);
  }

  delete(obj: Entity): Promise<Entity> {
    return this.repository.remove(obj);
  }

  update(obj: Entity): Promise<Entity> {
    return this.repository.save(obj);
  }
  abstract readonly repository: Repository<Entity>;
}
