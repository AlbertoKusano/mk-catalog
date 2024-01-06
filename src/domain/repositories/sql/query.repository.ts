import { FindAllOutput } from '../../contracts/infra-layer/repositories/types';
import { BaseEntity } from '../../entities/base.entity';
import { UniqueIdentifier } from '../../types';
import { BaseRepository } from './base.repository';

export abstract class QueryRepository<
  Entity extends BaseEntity,
> extends BaseRepository<Entity> {
  /**
   * Find an entity by its id
   * @param id - The id of the entity
   */
  abstract find(id: UniqueIdentifier): Promise<Entity>;

  /**
   * Find all entities
   * @param page - The page number
   * @param pageSize - The page size
   * @param where - The where clause
   */
  abstract findAll(
    page: number,
    pageSize: number,
    where?: Partial<Entity>,
  ): Promise<FindAllOutput<Entity>>;

  /**
   * Find one entity by its id
   * @param obj - The where clause
   */
  abstract findOneBy(obj: Partial<Entity>): Promise<Entity> | null;
}
