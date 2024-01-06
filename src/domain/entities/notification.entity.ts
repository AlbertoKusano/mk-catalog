import { UniqueIdentifier } from '@domain/types';

import { BaseEntity } from './base.entity';
import { Person } from './person.entity';

export interface Notification extends BaseEntity {
  criticality: string;
  message: string;
  receiver: Person;
}
