import { GatewayNames, TransferStatus, UniqueIdentifier } from '@domain/types';

import { BaseEntity } from './base.entity';

export interface CheckIn extends BaseEntity {
  accountId: Required<UniqueIdentifier>;
  agency?: number;
  bank?: string;
  bankAccount?: number;
  bankType?: string;
  externalTransferId?: string;
  fee?: number;
  gateway?: GatewayNames;
  message?: string;
  status: Required<TransferStatus>;
  valueInCents: Required<number>;
}
