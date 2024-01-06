import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HealthCheckModule } from './app/health-check/health-check.module';
import { ApplicationConfigModule } from './infra/configurations/config.module';

@Module({
  imports: [
    ApplicationConfigModule,
    ConfigModule.forRoot({ isGlobal: true }),
    HealthCheckModule,
  ],
  providers: [],
})
export class AppModule {}
