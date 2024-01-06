import { UniqueIdentifier } from '@domain/types';

import { BaseEntity } from './base.entity';
import { Person } from './person.entity';

export interface PhoneNumber extends BaseEntity {
  areaCode: Required<number>;
  description?: string;
  number: Required<number>;
  person: Person;
  type: 'cellphone' | 'commercial' | 'residential';
}
