import { UniqueIdentifier } from '@domain/types';

import { BaseEntity } from './base.entity';
import { Person } from './person.entity';

export interface Message extends BaseEntity {
  criticality: string;
  message: string;
  read: boolean;
  receiver: Person;
  sender: Person;
  type: string;
}
