import { HttpStatus } from '@nestjs/common';

export type HttpResponse<TBody = any> = {
  error?: string;
  response?: HttpResponseBody<TBody>;
  statusCode: Required<Readonly<HttpStatus>>;
};

export type HttpResponseBody<TBody = any> = {
  data?: TBody;
  errorMessages?: string[];
  message?: string;
  timestamp: string;
};
