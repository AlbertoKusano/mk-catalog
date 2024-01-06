import { TransferCommandRepository } from '@domain/repositories/sql/transfer/transfer.command-repository';
import { TransferQueryRepository } from '@domain/repositories/sql/transfer/transfer.query-repository';
import {
  UpdateTransfer,
  UpdateTransferInput,
  UpdateTransferOutput,
} from '@domain/use-cases/transfer/update-transfer.use-case';
import { MakeProvider } from '@infra/framework/factory/make-provider';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateTransferUseCase implements UpdateTransfer {
  constructor(
    private readonly transferQueryRepository: TransferQueryRepository,
    private readonly transferCommandRepository: TransferCommandRepository,
  ) {}
  async execute(input?: UpdateTransferInput): Promise<UpdateTransferOutput> {
    const { status, transferId } = input;
    let transfer = await this.transferQueryRepository.findOneBy({
      id: transferId,
    });
    transfer.status = status;

    transfer = await this.transferCommandRepository.update(transfer);
    return {
      externalTransferId: transfer.externalTransferId,
      fee: transfer.fee,
      gateway: transfer.gateway,
      status: transfer.status,
      transferId: transfer.id,
      valueInCents: transfer.valueInCents,
    };
  }
}

export const UpdateTransferUseCaseProvider = MakeProvider.make(
  UpdateTransfer,
  UpdateTransferUseCase,
);
