
import { BaseEntity } from './base.entity';
import { Discipline } from './discipline.entity';
import { Coordination, Institute } from './institute.entity';
import { Student } from './student.entity';
import { Teacher } from './teacher.entity';


export interface Course extends BaseEntity {
  coordination: Coordination;
  description: Required<string>;
  institute: Institute;
  name: Required<string>;
  teacher?: Teacher;
}

export interface CourseSupply extends BaseEntity {
  course: Course;
  note?: string;
  optional: boolean;
  quantity: number;
  supply: string;
}

export interface CourseDisciplines extends BaseEntity {
  course: Course;
  discipline: Discipline;
  passingScore: number;
}

export interface CourseDisciplineSupply extends BaseEntity {
  course: CourseDisciplines;
  note?: string;
  optional: boolean;
  quantity: number;
  supply: string;
}

export interface CourseRegistration extends BaseEntity {
  course: Course;
  student: Student;
}


