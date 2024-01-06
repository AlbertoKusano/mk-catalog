import { BaseEntity } from '../../entities/base.entity';
import { BaseRepository } from './base.repository';

export abstract class CommandRepository<
  Entity extends BaseEntity,
> extends BaseRepository<Entity> {
  abstract create(obj: Entity): Promise<Entity>;
  abstract delete(obj: Entity): Promise<Entity>;
  abstract update(obj: Entity): Promise<Entity>;
}
