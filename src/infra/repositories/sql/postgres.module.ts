import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

import { ApplicationConfigModule } from '../../configurations/config.module';
import { PostgresConnectionConfigService } from './postgres.config';
import { TransferModel } from './transfer/models/transfer.model';
import { TransferCommandRepositoryProvider } from './transfer/transfer.command-repository';
import { TransferQueryRepositoryProvider } from './transfer/transfer.query-repository';

const moduleExports = [
  TransferCommandRepositoryProvider,
  TransferQueryRepositoryProvider,
];
const moduleProviders = [
  TransferCommandRepositoryProvider,
  TransferQueryRepositoryProvider,
];

@Module({
  exports: [...moduleExports],
  imports: [
    TypeOrmModule.forRootAsync({
      dataSourceFactory: (options) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return Promise.resolve(
          addTransactionalDataSource(new DataSource(options)),
        );
      },
      imports: [ApplicationConfigModule],
      inject: [PostgresConnectionConfigService],
      useFactory: (postgresConnectionConfig: PostgresConnectionConfigService) =>
        postgresConnectionConfig.postgresConfig,
    }),
    TypeOrmModule.forFeature([TransferModel]),
  ],
  providers: [...moduleProviders],
})
export class PostgresModule {}
