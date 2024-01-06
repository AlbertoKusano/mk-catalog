import { UniqueIdentifier } from '@domain/types';
import { UseCase } from '@domain/use-cases/use-case';

export interface removeStudentAttributeInput {
  studentAttributeId: UniqueIdentifier;
}

export abstract class RemoveStudentAttribute extends UseCase<
  removeStudentAttributeInput,
  void
> {}
