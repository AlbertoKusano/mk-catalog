import { HttpStatus } from '@nestjs/common';

export abstract class DomainError extends Error {
  public readonly statusCode: HttpStatus;
  protected constructor(message?: string) {
    super(message);
    this.name = DomainError.name;
    this.statusCode = HttpStatus.BAD_REQUEST;
  }
}
