import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { type ValidationError } from 'class-validator';
import { type Response } from 'express';
import { isEmpty } from 'lodash';

@Catch(UnprocessableEntityException)
export class BadRequestExceptionFilter
  implements ExceptionFilter<UnprocessableEntityException>
{
  constructor(public reflector: Reflector) {}

  private validationFilter(validationErrors: ValidationError[]): void {
    for (const validationError of validationErrors) {
      const children = validationError.children;

      if (children && !isEmpty(children)) {
        this.validationFilter(children);

        return;
      }

      delete validationError.children;

      const constraints = validationError.constraints;

      if (!constraints) {
        return;
      }

      for (const [constraintKey, constraint] of Object.entries(constraints)) {
        if (!constraint) {
          constraints[constraintKey] = `error.fields.${constraintKey}`;
        }
      }
    }
  }

  catch(exception: UnprocessableEntityException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();
    const r = exception.getResponse() as { message: ValidationError[] };

    const validationErrors = r.message;
    this.validationFilter(validationErrors);

    response.status(statusCode).json(r);
  }
}
