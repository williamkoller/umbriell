// sentry-interceptor.ts

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as Sentry from '@sentry/node';

@Injectable()
export class SentryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof HttpException) {
          const response = error.getResponse();
          const responseBody =
            response instanceof Object ? response : { message: response };

          // Enviar detalhes do erro, incluindo o corpo da resposta, para o Sentry
          Sentry.withScope((scope) => {
            scope.setExtras({ responseBody });
            Sentry.captureException(error);
          });
        }

        return throwError(() => error);
      }),
    );
  }
}
