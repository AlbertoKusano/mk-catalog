
import { BaseEntity } from './base.entity';
import { Course } from './course.entity';
import { Student } from './student.entity';

export interface Register extends BaseEntity {
  active: boolean;
  course: Course;
  // createRegistry: (year?: number, semester?: number) => string;
  registry: string;
  student: Student;
}
