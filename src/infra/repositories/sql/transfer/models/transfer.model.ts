import { CheckIn } from '@domain/entities/check-in.entity';
import { GatewayNames, TransferStatus, UniqueIdentifier } from '@domain/types';
import { Column, Entity, Index } from 'typeorm';

import { BaseModel } from '../../base.model';

@Entity('Transfers')
export class TransferModel extends BaseModel implements CheckIn {
  @Index()
  @Column({ type: 'uuid' })
  accountId: Required<UniqueIdentifier>;
  @Column()
  agency: number;
  @Column()
  bank: string;
  @Column()
  bankAccount: number;
  @Column()
  bankType: string;
  @Column()
  externalTransferId: string;
  @Column()
  fee?: number;
  @Column()
  gateway: GatewayNames;
  @Column({ nullable: true })
  message?: string;
  @Column()
  status: TransferStatus;
  @Column()
  valueInCents: number;
}
