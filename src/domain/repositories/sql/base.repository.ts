import { BaseEntity } from '../../entities/base.entity';
import { DeepPartial } from '../../types';

export abstract class BaseRepository<Entity extends BaseEntity> {
  abstract normalize(obj: Entity): DeepPartial<Entity>;
}
