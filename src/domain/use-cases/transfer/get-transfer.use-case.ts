import { GatewayNames, TransferStatus, UniqueIdentifier } from '@domain/types';
import { UseCase } from '@domain/use-cases/use-case';

export interface GetTransferInput {
  transferId: UniqueIdentifier;
}

export abstract class GetTransferOutput {
  agency: number;
  bank: string;
  bankAccount: number;
  bankType: string;
  externalTransferId?: string;
  fee: number;
  gateway: GatewayNames;
  status: TransferStatus;
  transferId: UniqueIdentifier;
  valueInCents: number;
}

export abstract class GetTransfer extends UseCase<
  GetTransferInput,
  GetTransferOutput
> {}
