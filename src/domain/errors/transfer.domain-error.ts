import { HttpStatus } from '@nestjs/common';

import { DomainError } from './domain-error';

export class InsuficientBalance extends DomainError {
  public readonly statusCode: HttpStatus;
  constructor(message: string = 'insuficient balance') {
    super(message);
    this.name = InsuficientBalance.name;
    this.statusCode = HttpStatus.UNAUTHORIZED;
  }
}
