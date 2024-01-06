import { Person } from '@domain/entities/person.entity';

import { CommandRepository } from '../command.repository';

export abstract class PersonCommandRepository extends CommandRepository<Person> {}
