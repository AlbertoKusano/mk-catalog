import { HttpStatus } from '@nestjs/common';

import { DomainError } from './domain-error';

export class GatewayError extends DomainError {
  public readonly statusCode: HttpStatus;
  constructor(message: string = 'gateway Error') {
    super(message);
    this.name = GatewayError.name;
    this.statusCode = HttpStatus.FAILED_DEPENDENCY;
  }
}
