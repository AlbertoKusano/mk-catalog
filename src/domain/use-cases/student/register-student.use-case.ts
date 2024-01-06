import { UniqueIdentifier } from '@domain/types';
import { UseCase } from '@domain/use-cases/use-case';

export interface registerStudentInput {
  courseId: UniqueIdentifier;
  studentId: UniqueIdentifier;
}

export abstract class registerStudentOutput {
  registerId: UniqueIdentifier;
}

export abstract class RegisterStudent extends UseCase<
  registerStudentInput,
  registerStudentOutput
> {}
