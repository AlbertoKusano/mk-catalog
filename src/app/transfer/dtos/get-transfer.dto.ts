import { UniqueIdentifier } from '@domain/types';
import {
  GetTransferInput,
  GetTransferOutput,
} from '@domain/use-cases/transfer';
import { IsString } from 'class-validator';

export class GetTransferInputDto implements GetTransferInput {
  @IsString()
  transferId: UniqueIdentifier;
}

export class GetTransferOutputDto extends GetTransferOutput {}
