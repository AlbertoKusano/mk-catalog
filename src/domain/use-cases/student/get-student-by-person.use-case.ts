import { Person } from '@domain/entities/person.entity';
import { UseCase } from '@domain/use-cases/use-case';

export interface getPersonByDocumentInput {
  document: string;
}

export abstract class GetPersonByDocument extends UseCase<
  getPersonByDocumentInput,
  Person
> {}
