import { CheckIn } from '@domain/entities/check-in.entity';
import { UniqueIdentifier } from '@domain/types';
import { UseCase } from '@domain/use-cases/use-case';

export interface ListTransferInput {
  accountId: UniqueIdentifier;
  filter: ListFilter;
}

export interface ListFilter {
  endDate?: Date;
  initialDate: Date;
  limit?: number;
  orderBy?: {
    [key in keyof CheckIn]: 'ASC' | 'DESC';
  };
  page?: number;
}

export abstract class ListTransferOutput {
  accountId: UniqueIdentifier;
  itens: CheckIn[];
  itensCount: number;
  page: number;
  pagesCount: number;
}

export abstract class ListTransfer extends UseCase<
  ListTransferInput,
  ListTransferOutput
> {}
