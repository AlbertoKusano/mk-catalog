import { UniqueIdentifier } from '../types';

export abstract class BaseEntity {
  public createdAt?: Date;
  public id?: UniqueIdentifier;
  public updatedAt?: Date;
}
