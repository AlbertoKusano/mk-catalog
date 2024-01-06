import { UniqueIdentifier } from '../../types';
import { UseCase } from '../use-case';

export interface GetTransferByExternalTransferIdInput {
  externalTransferId: string;
}

export interface GetTransferByExternalTransferIdOutput {
  accountId: UniqueIdentifier;
  id: UniqueIdentifier;
  valueInCents: number;
}

export abstract class GetTransferByExternalTransferId extends UseCase<
  GetTransferByExternalTransferIdInput,
  GetTransferByExternalTransferIdOutput
> {}
