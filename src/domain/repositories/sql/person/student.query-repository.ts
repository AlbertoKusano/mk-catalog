import { Person } from '@domain/entities/person.entity';
import { Student } from '@domain/entities/student.entity';

import { QueryRepository } from '../query.repository';

export abstract class StudentQueryRepository extends QueryRepository<Student> {
}
