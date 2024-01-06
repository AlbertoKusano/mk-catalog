import { UniqueIdentifier } from '@domain/types';

import { BaseEntity } from './base.entity';

export interface Person extends BaseEntity {
  birthDate: Required<Date>;
  document?: Required<string>;
  name: Required<string>;
}
