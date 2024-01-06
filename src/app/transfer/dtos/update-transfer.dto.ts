import { TransferStatus, UniqueIdentifier } from '@domain/types';
import {
  UpdateTransferInput,
  UpdateTransferOutput,
} from '@domain/use-cases/transfer';
import { IsString } from 'class-validator';

export class UpdateTransferInputDto implements UpdateTransferInput {
  @IsString()
  accountId: UniqueIdentifier;
  @IsString()
  status: TransferStatus;
  @IsString()
  transferId: UniqueIdentifier;
}

export class UpdateTransferOutputDto extends UpdateTransferOutput {}
