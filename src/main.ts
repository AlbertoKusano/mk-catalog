import {
  HttpStatus,
  Logger,
  RequestMethod,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import * as compression from 'compression';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { ApplicationConfigModule } from './infra/configurations/config.module';
import { ApplicationConfigService } from './infra/configurations/config.service';
import { BadRequestExceptionFilter } from './infra/errors/bad-request.filter';
import { setupSwagger } from './setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.use(helmet());
  app.use(compression());
  app.enableVersioning();
  app.enableCors();

  const reflector = app.get(Reflector);

  app.useGlobalFilters(new BadRequestExceptionFilter(reflector));

  app.useGlobalPipes(
    new ValidationPipe({
      dismissDefaultMessages: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      exceptionFactory: (errors) => new UnprocessableEntityException(errors),
      transform: true,
    }),
  );

  app.setGlobalPrefix('api', {
    exclude: [{ method: RequestMethod.GET, path: 'health-check' }],
  });

  const configService = app
    .select(ApplicationConfigModule)
    .get(ApplicationConfigService);

  if (configService.documentationEnabled) {
    setupSwagger(app);
  }

  if (!configService.isDevelopment) {
    app.enableShutdownHooks();
  }

  const port = configService.appConfig.port;

  await app.listen(port, () => {
    logger.log(`Application listening on port ${port}`);
    if (process.env.NODE_ENV === 'production') {
      console.info(
        "\x1b[31m !!!!! You're running in production mode, be careful !!!!! \x1b[0m",
      );
    }
  });
}
bootstrap();
