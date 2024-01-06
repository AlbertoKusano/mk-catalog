import {
  HttpResponse,
  HttpResponseBody,
} from '@domain/contracts/presentation-layer/types';
import { DomainError } from '@domain/errors/domain-error';
import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export interface HttpResponseBuilder<PayloadType> {
  build: () => Promise<HttpResponse<PayloadType>>;
  onErrorDefineMessageAs: (message: string) => HttpResponseBuilder<PayloadType>;
  onErrorDefineStatusAs: (
    statusCode: HttpStatus,
  ) => HttpResponseBuilder<PayloadType>;
  onSuccessDefineMessageAs: (
    message: string,
  ) => HttpResponseBuilder<PayloadType>;
  onSuccessDefineStatusAs: (
    statusCode: HttpStatus,
  ) => HttpResponseBuilder<PayloadType>;
}

export class HttpResponseHelper {
  constructor(private httpResponse: Response) {}

  static use(res: Response): HttpResponseHelper {
    return new HttpResponseHelper(res);
  }

  private static buildResponse<PayloadType>(
    promise$: Promise<PayloadType>,
    _statusCode: HttpStatus,
    _errorStatusCode: HttpStatus,
    _errorMessage: string,
    _message: string,
  ): Promise<HttpResponse<PayloadType>> {
    return promise$
      .then((data: PayloadType) =>
        this.makeSuccessResponse(data, _statusCode, _message),
      )
      .catch((err: DomainError) => {
        return Promise.resolve(
          this.makeErrorResponse(err, _errorStatusCode, _errorMessage),
        );
      });
  }

  private static makeErrorResponse(
    err: DomainError,
    statusCode: HttpStatus,
    errorMessage?: string,
  ): HttpResponse {
    const _statusCode = err?.statusCode || statusCode;
    const _errorMessage =
      errorMessage || err?.message || 'Internal server error';

    const response: HttpResponseBody = {
      errorMessages: [_errorMessage],
      message: _errorMessage,
      timestamp: new Date().toISOString(),
    };

    return {
      response,
      statusCode: _statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
    } as HttpResponse;
  }

  private static makeSuccessResponse<PayloadType>(
    response: PayloadType,
    statusCode: HttpStatus,
    message?: string,
  ): HttpResponse<PayloadType> {
    const responseBody: HttpResponseBody<PayloadType> = {
      data: response,
      message,
      timestamp: new Date().toISOString(),
    };

    return {
      response: responseBody,
      statusCode: statusCode || HttpStatus.OK,
    } as HttpResponse<PayloadType>;
  }

  makeSimpleHttpResponseTo<PayloadType>(
    promise$: Promise<PayloadType>,
  ): HttpResponseBuilder<PayloadType> {
    let _statusCode: HttpStatus = HttpStatus.OK;
    let _errorStatusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let _errorMessage;
    let _message;

    return {
      build: (): Promise<HttpResponse<PayloadType>> => {
        return HttpResponseHelper.buildResponse(
          promise$,
          _statusCode,
          _errorStatusCode,
          _errorMessage,
          _message,
        )
          .then((data) => {
            return this.httpResponse
              .status(data.statusCode)
              .json(data.response);
          })
          .catch((error) => {
            return this.httpResponse
              .status(error.statusCode)
              .json(error.response);
          });
      },
      onErrorDefineMessageAs: function (
        message: string,
      ): HttpResponseBuilder<PayloadType> {
        _errorMessage = message;
        return this;
      },
      onErrorDefineStatusAs: function (
        statusCode: HttpStatus,
      ): HttpResponseBuilder<PayloadType> {
        _errorStatusCode = statusCode;
        return this;
      },
      onSuccessDefineMessageAs: function (
        msg: string,
      ): HttpResponseBuilder<PayloadType> {
        _message = msg;
        return this;
      },
      onSuccessDefineStatusAs: function (
        statusCode: HttpStatus,
      ): HttpResponseBuilder<PayloadType> {
        _statusCode = statusCode;
        return this;
      },
    };
  }
}
