import { GatewayNames, TransferStatus, UniqueIdentifier } from '@domain/types';
import { UseCase } from '@domain/use-cases/use-case';

export interface UpdateTransferInput {
  accountId: UniqueIdentifier;
  status: TransferStatus;
  transferId: UniqueIdentifier;
}

export abstract class UpdateTransferOutput {
  externalTransferId?: string;
  fee: number;
  gateway: GatewayNames;
  status: TransferStatus;
  transferId: UniqueIdentifier;
  valueInCents: number;
}

export abstract class UpdateTransfer extends UseCase<
  UpdateTransferInput,
  UpdateTransferOutput
> {}
