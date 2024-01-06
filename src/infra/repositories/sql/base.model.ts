import { BaseEntity } from '@domain/entities/base.entity';
import { UniqueIdentifier } from '@domain/types';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseModel implements BaseEntity {
  @CreateDateColumn()
  public createdAt: Date;
  @PrimaryGeneratedColumn('uuid')
  public id: Required<Readonly<UniqueIdentifier>>;
  @UpdateDateColumn()
  public updatedAt: Date;
}
