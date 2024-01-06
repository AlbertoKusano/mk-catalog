import { Global, Module } from '@nestjs/common';

import { PostgresConnectionConfigService } from '../repositories/sql/postgres.config';
import { ApplicationConfigService } from './config.service';

@Global()
@Module({
  exports: [ApplicationConfigService, PostgresConnectionConfigService],
  providers: [ApplicationConfigService, PostgresConnectionConfigService],
})
export class ApplicationConfigModule {}
