
import { BaseEntity } from './base.entity';
import { Person } from './person.entity';

export interface Institute extends BaseEntity {
  name: Required<string>;
}

export interface Board extends BaseEntity {
  institute: Institute
  person: Person;
}

export interface Coordination extends BaseEntity {
  institute: Institute
  person: Person;
}


