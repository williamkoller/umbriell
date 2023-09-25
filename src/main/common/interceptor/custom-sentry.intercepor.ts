import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as Sentry from '@sentry/node';
import { SentryInterceptor } from './sentry.interceptor';

@Injectable()
export class CustomSentryInterceptor extends SentryInterceptor {
  intercept(context, next): Observable<any> {
    return super.intercept(context, next).pipe(
      catchError((error) => {
        // Captura e envia o erro para o Sentry
        Sentry.captureException(error);

        // Rejeita o erro para que ele continue a ser tratado
        return Promise.reject(error);
      }),
    );
  }
}
