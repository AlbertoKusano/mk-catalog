
import { BaseEntity } from './base.entity';
import { Institute } from './institute.entity';

export interface Discipline extends BaseEntity {
  description?: string;
  institute: Institute;
  name: Required<string>;
}

