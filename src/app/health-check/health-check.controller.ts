import { Controller, Get } from '@nestjs/common';

import { version } from '../../../package.json';

@Controller('health-check')
export class HealthCheckController {
  @Get()
  getHello(): string {
    return 'Running at version ' + version;
  }
}
