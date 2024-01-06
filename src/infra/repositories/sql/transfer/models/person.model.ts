import { Person } from '@domain/entities/person.entity';
import { Column, Entity, Index } from 'typeorm';

import { BaseModel } from '../../base.model';

@Entity('Persons')
export class PersonModel extends BaseModel implements Person {
  @Column()
  birthDate: Required<Date>;
  @Index()
  @Column()
  document: string;
  @Column()
  name: string;
}
