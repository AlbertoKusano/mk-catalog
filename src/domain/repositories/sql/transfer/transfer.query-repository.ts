import { FindAllOutput } from '@domain/contracts/infra-layer/repositories/types';
import { CheckIn } from '@domain/entities/check-in.entity';
import { UniqueIdentifier } from '@domain/types';

import { QueryRepository } from '../query.repository';

export abstract class TransferQueryRepository extends QueryRepository<CheckIn> {
  abstract getByAccountIdPeriod(
    accountId: UniqueIdentifier,
    initialDate: Date,
    endDate: Date,
    page: number,
    limit: number,
    order: {
      [P in keyof CheckIn]?: 'ASC' | 'DESC';
    },
  ): Promise<FindAllOutput<CheckIn>>;
}
