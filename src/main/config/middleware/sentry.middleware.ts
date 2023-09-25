import { Injectable, NestMiddleware } from '@nestjs/common';
import * as Sentry from '@sentry/node';

class HttpErrorWithRequest extends Error {
  status: number;
  request: any;

  constructor(status: number, message: string, request: any) {
    super(message);
    this.status = status;
    this.request = request;
  }
}

@Injectable()
export class SentryMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    res.on('finish', () => {
      if (res.statusCode >= 400) {
        const error = new HttpErrorWithRequest(
          res.statusCode,
          `HTTP Error ${res.statusCode}`,
          req,
        );

        // Captura e envia o erro para o Sentry
        Sentry.captureException(error);
      }
    });
    next();
  }
}
