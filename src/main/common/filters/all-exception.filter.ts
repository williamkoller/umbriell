import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as Sentry from '@sentry/node';

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      errorList:
        exception instanceof HttpException ? exception.getResponse() : null,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    Sentry.captureException(errorResponse);

    response.status(status).json(errorResponse);
  }
}
