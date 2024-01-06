import { UniqueIdentifier } from '@domain/types';
import { IsString } from 'class-validator';

import {
  GetTransferByExternalTransferIdInput,
  GetTransferByExternalTransferIdOutput,
} from '../../../domain/use-cases/transfer/get-transfer-by-external-transfer-id.use-case';

export class GetTransferByExternalTransferIdInputDto
  implements GetTransferByExternalTransferIdInput
{
  @IsString()
  externalTransferId: string;
}

export class GetTransferByExternalTransferIdOutputDto
  implements GetTransferByExternalTransferIdOutput
{
  accountId: UniqueIdentifier;
  id: UniqueIdentifier;
  valueInCents: number;
}
