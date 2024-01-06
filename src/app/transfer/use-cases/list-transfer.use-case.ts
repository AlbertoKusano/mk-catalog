import { TransferQueryRepository } from '@domain/repositories/sql/transfer/transfer.query-repository';
import {
  ListTransfer,
  ListTransferInput,
  ListTransferOutput,
} from '@domain/use-cases/transfer/list-transfer.use-case';
import { MakeProvider } from '@infra/framework/factory/make-provider';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ListTransferUseCase implements ListTransfer {
  private readonly logger = new Logger(ListTransferUseCase.name);
  constructor(
    private readonly transferQueryRepository: TransferQueryRepository,
  ) {}
  async execute(input?: ListTransferInput): Promise<ListTransferOutput> {
    const { accountId, filter } = input;

    const result = await this.transferQueryRepository.getByAccountIdPeriod(
      accountId,
      filter.initialDate,
      filter.endDate || new Date(),
      filter.page || 1,
      filter.limit || 100,
      filter.orderBy,
    );
    return {
      accountId: accountId,
      itens: result.items,
      itensCount: result.total,
      page: result.page,
      pagesCount: result.pageCount,
    };
  }
}

export const ListTransferUseCaseProvider = MakeProvider.make(
  ListTransfer,
  ListTransferUseCase,
);
