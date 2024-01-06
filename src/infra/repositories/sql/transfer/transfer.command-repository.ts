import { CheckIn } from '@domain/entities/check-in.entity';
import { TransferCommandRepository } from '@domain/repositories/sql/transfer/transfer.command-repository';
import { MakeProvider } from '@infra/framework/factory/make-provider';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CommandRepositoryAdapter } from '../command-repository.adapter';
import { TransferModel } from './models/transfer.model';

export class TransferCommandRepositoryImp
  extends CommandRepositoryAdapter<CheckIn>
  implements TransferCommandRepository
{
  constructor(
    @InjectRepository(TransferModel)
    readonly repository: Repository<CheckIn>,
  ) {
    super();
  }
}

export const TransferCommandRepositoryProvider = MakeProvider.make(
  TransferCommandRepository,
  TransferCommandRepositoryImp,
);
