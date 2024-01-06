import { UniqueIdentifier } from '@domain/types';
import { UseCase } from '@domain/use-cases/use-case';

export interface createPersonInput {
  birthDate: Required<Date>;
  document: Required<string>;
  name: Required<string>;
}

export abstract class createPersonOutput {
  personId: UniqueIdentifier;
}

export abstract class CreatePerson extends UseCase<
  createPersonInput,
  createPersonOutput
> {}
