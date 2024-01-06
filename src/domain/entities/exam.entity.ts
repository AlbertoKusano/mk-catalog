
import { BaseEntity } from './base.entity';
import { Class } from './class.entity';
import { Student } from './student.entity';

export interface Exam extends BaseEntity {
  class: Class;
  date: Date;
  maxScore?: number;
}

export interface ExamResult extends BaseEntity {
  classExam: Exam;
  note?: string;
  score: number;
  student: Student;
}
