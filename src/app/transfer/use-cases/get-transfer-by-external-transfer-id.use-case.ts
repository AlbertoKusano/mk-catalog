import { TransferQueryRepository } from '@domain/repositories/sql/transfer/transfer.query-repository';
import {
  GetTransferByExternalTransferId,
  GetTransferByExternalTransferIdInput,
  GetTransferByExternalTransferIdOutput,
} from '@domain/use-cases/transfer/get-transfer-by-external-transfer-id.use-case';
import { MakeProvider } from '@infra/framework/factory/make-provider';
import { Injectable } from '@nestjs/common';

import { TransferNotFound } from '../../../domain/errors/transfer-not-found.domain-error';

@Injectable()
export class GetTransferByExternalTransferIdUseCase
  implements GetTransferByExternalTransferId
{
  constructor(
    private readonly transferQueryRepository: TransferQueryRepository,
  ) {}
  async execute(
    input?: GetTransferByExternalTransferIdInput,
  ): Promise<GetTransferByExternalTransferIdOutput> {
    const transfer = await this.transferQueryRepository.findOneBy({
      externalTransferId: input.externalTransferId,
    });

    if (!transfer) {
      throw new TransferNotFound();
    }

    return {
      accountId: transfer.accountId,
      id: transfer.id,
      valueInCents: transfer.valueInCents,
    };
  }
}

export const GetTransferByExternalTransferIdUseCaseProvider = MakeProvider.make(
  GetTransferByExternalTransferId,
  GetTransferByExternalTransferIdUseCase,
);
