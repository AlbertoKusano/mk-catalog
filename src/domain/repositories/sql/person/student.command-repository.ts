import { Person } from '@domain/entities/person.entity';
import { Student } from '@domain/entities/student.entity';

import { CommandRepository } from '../command.repository';

export abstract class StudentCommandRepository extends CommandRepository<Student> {}
