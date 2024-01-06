import { TransferQueryRepository } from '@domain/repositories/sql/transfer/transfer.query-repository';
import {
  GetTransfer,
  GetTransferInput,
  GetTransferOutput,
} from '@domain/use-cases/transfer/get-transfer.use-case';
import { MakeProvider } from '@infra/framework/factory/make-provider';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetTransferUseCase implements GetTransfer {
  constructor(
    private readonly transferQueryRepository: TransferQueryRepository,
  ) {}
  async execute(input?: GetTransferInput): Promise<GetTransferOutput> {
    const transfer = await this.transferQueryRepository.findOneBy({
      id: input.transferId,
    });
    return {
      agency: transfer.agency,
      bank: transfer.bank,
      bankAccount: transfer.bankAccount,
      bankType: transfer.bankType,
      externalTransferId: transfer.externalTransferId,
      fee: transfer.fee,
      gateway: transfer.gateway,
      status: transfer.status,
      transferId: transfer.id,
      valueInCents: transfer.valueInCents,
    };
  }
}

export const GetTransferUseCaseProvider = MakeProvider.make(
  GetTransfer,
  GetTransferUseCase,
);
