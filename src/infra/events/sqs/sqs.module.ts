import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SqsModule as NestjsSqsModule } from '@ssut/nestjs-sqs';

import { SqsAdapterProvider } from './sqs.adapter';
const logger = new Logger('SqsModule');

const moduleProviders = [SqsAdapterProvider];
const moduleExports = [SqsAdapterProvider, NestjsSqsModule];

@Module({
  exports: [...moduleExports],
  imports: [
    NestjsSqsModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        consumers: [],
        logger,
        producers: [],
      }),
    }),
  ],
  providers: [...moduleProviders],
})
export class SqsModule {}
