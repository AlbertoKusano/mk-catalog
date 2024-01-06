import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class PostgresConnectionConfigService {
  constructor(private configService: ConfigService) {}

  get isTest(): boolean {
    return this.nodeEnv === 'test';
  }

  get nodeEnv(): string {
    return this.configService.get<string>('NODE_ENV');
  }

  get postgresConfig(): TypeOrmModuleOptions {
    const entities = [
      __dirname + '/../../repositories/sql/**/*.model{.ts,.js}',
    ];

    return {
      database: this.configService.get<string>('DB_DATABASE'),
      dropSchema: this.isTest,
      entities,
      host: this.configService.get<string>('DB_HOST'),
      keepConnectionAlive: !this.isTest,
      logging:
        this.configService.get<string>('ENABLE_ORM_LOGS') === 'true'
          ? true
          : false,
      name: 'default',
      password: this.configService.get<string>('DB_PASSWORD'),
      port: this.configService.get<number>('DB_PORT'),
      ...(this.configService.get('DB_SSL_REJECT_UNAUTHORIZED') &&
      this.configService.get('DB_SSL_REJECT_UNAUTHORIZED') === 'false'
        ? {
            ssl: {
              rejectUnauthorized: false,
            },
          }
        : {}),
      cache: {
        alwaysEnabled: true,
        duration: 1000,
        type: 'database',
      },
      synchronize: true,
      type: 'postgres',
      username: this.configService.get<string>('DB_USERNAME'),
    };
  }
}
