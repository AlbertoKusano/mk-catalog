import { UniqueIdentifier } from '@domain/types';
import { UseCase } from '@domain/use-cases/use-case';

export interface updatePersonInput {
  birthDate: Required<Date>;
  document: Required<string>;
  name: Required<string>;
}

export abstract class updatePersonOutput {
  personId: UniqueIdentifier;
}

export abstract class updatePerson extends UseCase<
  updatePersonInput,
  updatePersonOutput
> {}
