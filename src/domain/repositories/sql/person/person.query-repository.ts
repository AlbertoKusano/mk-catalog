import { Person } from '@domain/entities/person.entity';

import { QueryRepository } from '../query.repository';

export abstract class PersonQueryRepository extends QueryRepository<Person> {
  abstract getByDocument(document: string): Promise<Person>;
}
