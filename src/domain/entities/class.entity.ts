
import { BaseEntity } from './base.entity';
import { CourseDisciplines } from './course.entity';
import { Teacher } from './teacher.entity';


export interface Class extends BaseEntity {
  courseDisciplines: CourseDisciplines;
  teacher: Teacher;
}
