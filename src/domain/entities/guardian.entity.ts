
import { BaseEntity } from './base.entity';
import { Person } from './person.entity';
import { PhoneNumber } from './phone-number.entity';
import { Student } from './student.entity';

export interface Guardian extends BaseEntity {
  contactPhoneNumber: PhoneNumber;
  contactPriority: Required<number>;
  note?: string;
  parentage: Required<string>;
  person: Person;
  student: Student;
}
