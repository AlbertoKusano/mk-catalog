import { PostgresModule } from '@infra/repositories/sql/postgres.module';
import { Module } from '@nestjs/common';

import { TransferController } from './transfer.controller';
import { GetTransferUseCaseProvider } from './use-cases/get-transfer.use-case';
import { GetTransferByExternalTransferIdUseCaseProvider } from './use-cases/get-transfer-by-external-transfer-id.use-case';
import { ListTransferUseCaseProvider } from './use-cases/list-transfer.use-case';
import { UpdateTransferUseCaseProvider } from './use-cases/update-transfer.use-case';

const moduleExports = [];
const moduleProviders = [
  GetTransferUseCaseProvider,
  ListTransferUseCaseProvider,
  UpdateTransferUseCaseProvider,
  GetTransferByExternalTransferIdUseCaseProvider,
];

@Module({
  controllers: [TransferController],
  exports: [...moduleExports],
  imports: [PostgresModule],
  providers: [...moduleProviders],
})
export class TransferModule {}
