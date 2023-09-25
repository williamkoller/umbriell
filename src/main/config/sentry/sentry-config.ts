import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as Sentry from '@sentry/node';

@Injectable()
export class SentryConfig {
  constructor(private readonly config: ConfigService) {}
  init(app: NestExpressApplication): void {
    Sentry.init({
      dsn: this.config.get<string>('DSN_SENTRY'),
      integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Sentry.Integrations.Express({ app: app as any }),
      ],
      tracesSampleRate: 1.0,
      profilesSampleRate: 1.0,
      autoSessionTracking: false,
      environment: this.config.get<string>('NODE_ENV'),
    });
  }
}
