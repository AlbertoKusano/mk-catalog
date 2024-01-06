import { BaseEntity } from '@domain/entities/base.entity';
import { BaseRepository } from '@domain/repositories/sql/base.repository';
import { DeepPartial } from '@domain/types';

export class BaseRepositoryAdapter<Entity extends BaseEntity>
  implements BaseRepository<Entity>
{
  normalize(obj: any): DeepPartial<Entity> {
    return obj;
  }
}
