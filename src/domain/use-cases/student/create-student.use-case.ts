import { UniqueIdentifier } from '@domain/types';
import { UseCase } from '@domain/use-cases/use-case';

export interface createStudentInput {
  personId: UniqueIdentifier;
}

export abstract class createStudentOutput {
  studentId: UniqueIdentifier;
}

export abstract class CreateStudent extends UseCase<
  createStudentInput,
  createStudentOutput
> {}
