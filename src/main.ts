import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/infra/ioc/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['debug', 'error', 'log', 'verbose', 'warn'],
    cors: true,
    autoFlushLogs: true,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.setGlobalPrefix('api/v1');

  const config = app.get<ConfigService>(ConfigService);
  const port = config.get<number>('PORT');
  const appName = config.get<string>('APP_NAME');

  const logger = new Logger(`Main - ${appName}`);

  await app.listen(port, async () =>
    logger.log(`Server running at ${await app.getUrl()}`),
  );
}
bootstrap();
