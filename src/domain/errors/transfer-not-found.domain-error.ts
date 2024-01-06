import { HttpStatus } from '@nestjs/common';

import { DomainError } from './domain-error';

export class TransferNotFound extends DomainError {
  public readonly statusCode: HttpStatus;
  constructor(message: string = 'Transferência não encontrada') {
    super(message);
    this.name = TransferNotFound.name;
    this.statusCode = HttpStatus.NOT_FOUND;
  }
}
