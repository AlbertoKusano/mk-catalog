
import { BaseEntity } from './base.entity';
import { Institute } from './institute.entity';
import { Person } from './person.entity';

export interface Teacher extends BaseEntity {
  institute: Institute;
  person: Person;
}