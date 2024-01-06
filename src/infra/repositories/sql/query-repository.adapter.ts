import { BaseEntity } from '@domain/entities/base.entity';
import { QueryRepository } from '@domain/repositories/sql/query.repository';
import { UniqueIdentifier } from '@domain/types';
import { FindOptionsWhere, Repository } from 'typeorm';

import { FindAllOutput } from '../../../domain/contracts/infra-layer/repositories/types';
import { BaseRepositoryAdapter } from './base-repository.adapter';

export abstract class QueryRepositoryAdapter<Entity extends BaseEntity>
  extends BaseRepositoryAdapter<Entity>
  implements QueryRepository<Entity>
{
  protected constructor() {
    super();
  }
  find(id: UniqueIdentifier): Promise<Entity> {
    return this.repository.findOne({
      where: { id } as FindOptionsWhere<Entity>,
    });
  }

  async findAll(
    page: number = 1,
    pageSize: number = 10,
    where?: Partial<Entity>,
  ): Promise<FindAllOutput<Entity>> {
    const take = pageSize;
    const skip = (page - 1) * pageSize;

    const [items, total] = await this.repository.findAndCount({
      skip,
      take,
      where: where as FindOptionsWhere<Entity>,
    });

    const pageCount = Math.ceil(total / pageSize);

    const hasNextPage = page < pageCount;
    const hasPreviousPage = page > 1;

    return {
      hasNextPage,
      hasPreviousPage,
      items,
      page,
      pageCount,
      take,
      total,
    };
  }

  findOneBy(obj: Partial<Entity>): Promise<Entity> | null {
    return this.repository.findOne({
      where: obj as FindOptionsWhere<Entity>,
    });
  }

  abstract readonly repository: Repository<Entity>;
}
