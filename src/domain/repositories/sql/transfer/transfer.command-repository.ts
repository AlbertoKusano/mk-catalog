import { CheckIn } from '@domain/entities/check-in.entity';

import { CommandRepository } from '../command.repository';

export abstract class TransferCommandRepository extends CommandRepository<CheckIn> {}
