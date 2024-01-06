import { StudentAttributeType } from '@domain/entities/student.entity';
import { UniqueIdentifier } from '@domain/types';
import { UseCase } from '@domain/use-cases/use-case';

export interface addStudentAttributeInput {
  attribute: string;
  note?: string;
  studentId: UniqueIdentifier;
  type: StudentAttributeType;
}

export abstract class addStudentAttributeOutput {
  studentAttributeId: UniqueIdentifier;
}

export abstract class AddStudentAttribute extends UseCase<
  addStudentAttributeInput,
  addStudentAttributeOutput
> {}
