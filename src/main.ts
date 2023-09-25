import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/infra/ioc/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { AllExceptionsFilter } from './main/common/filters/all-exception.filter';
import { SentryConfig } from './main/config/sentry/sentry-config';
import { swaggerConfig } from './main/config/docs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['debug', 'error', 'log', 'verbose', 'warn'],
    cors: true,
    autoFlushLogs: true,
  });

  swaggerConfig(app);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.setGlobalPrefix('api/v1');

  const config = app.get<ConfigService>(ConfigService);
  const port = config.get<number>('PORT');
  const appName = config.get<string>('APP_NAME');

  new SentryConfig(new ConfigService()).init(app);

  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.errorHandler());

  const logger = new Logger(`Main - ${appName}`);

  await app.listen(port);
  const url = await app.getUrl();
  logger.log(`Server running at: ${url}/api/docs`);
}
bootstrap();
