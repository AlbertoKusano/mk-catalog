
import { BaseEntity } from './base.entity';
import { Guardian } from './guardian.entity';
import { Institute } from './institute.entity';
import { Person } from './person.entity';

export interface Student extends BaseEntity {
  allergies?: StudentAttribute[];
  birthDate: Date;
  guardians?: Guardian[];
  name: string;
  person?: Person;
  reportCards?: StudentReportCard[];
  representative?: Person;
  specialNecessities?: StudentAttribute[];
}

export interface StudentAttribute extends BaseEntity {
  attribute: string;
  note?: string;
  student: Student;
  type: StudentAttributeType;
}

export interface StudentReportCard extends BaseEntity {
  discipline: string;
  institute: Institute;
  referencePeriod: string;
  score: number;
  student: Student;
}

export type StudentAttributeType = 'allergy' | 'specialNecessity';
