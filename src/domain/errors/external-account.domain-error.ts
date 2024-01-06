import { HttpStatus } from '@nestjs/common';

import { DomainError } from './domain-error';

export class AccountNotFound extends DomainError {
  public readonly statusCode: HttpStatus;
  constructor(message: string = 'account not found') {
    super(message);
    this.name = AccountNotFound.name;
    this.statusCode = HttpStatus.NOT_FOUND;
  }
}
