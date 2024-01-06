import { FindAllOutput } from '@domain/contracts/infra-layer/repositories/types';
import { CheckIn } from '@domain/entities/check-in.entity';
import { TransferQueryRepository } from '@domain/repositories/sql/transfer/transfer.query-repository';
import { UniqueIdentifier } from '@domain/types';
import { MakeProvider } from '@infra/framework/factory/make-provider';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

import { QueryRepositoryAdapter } from '../query-repository.adapter';
import { TransferModel } from './models/transfer.model';

export class TransferQueryRepositoryImp
  extends QueryRepositoryAdapter<CheckIn>
  implements TransferQueryRepository
{
  constructor(
    @InjectRepository(TransferModel)
    readonly repository: Repository<CheckIn>,
  ) {
    super();
  }
  async getByAccountIdPeriod(
    accountId: UniqueIdentifier,
    initialDate: Date,
    endDate: Date,
    page: number,
    pageSize: number,
    order: {
      [P in keyof CheckIn]?: 'ASC' | 'DESC';
    } = { createdAt: 'DESC' },
  ): Promise<FindAllOutput<CheckIn>> {
    const take = pageSize;
    const skip = (page - 1) * pageSize;
    const [items, total] = await this.repository.findAndCount({
      cache: {
        id: `transfer:account:${accountId}:page:${page}:limit:${pageSize}:initialDate:${initialDate.getTime()}:endDate:${endDate.getTime()}:order:${JSON.stringify(
          order ?? {},
        )}`,
        milliseconds: 10000,
      },
      order,
      skip,
      take,
      where: {
        accountId,
        createdAt: Between(initialDate, endDate),
      },
    });
    const pageCount = Math.ceil(total / pageSize);
    const hasNextPage = page < pageCount;
    const hasPreviousPage = page > 1;
    return {
      hasNextPage,
      hasPreviousPage,
      items,
      page,
      pageCount,
      take,
      total,
    };
  }
}

export const TransferQueryRepositoryProvider = MakeProvider.make(
  TransferQueryRepository,
  TransferQueryRepositoryImp,
);
