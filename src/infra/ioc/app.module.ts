import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from '@app/infra/db/config/typeorm/typeorm-config';
import { UserModule } from './user.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SentryInterceptor } from '@app/main/common/interceptor/sentry.interceptor';
import { SentryMiddleware } from '@app/main/config/middleware/sentry.middleware';
import { SentryConfig } from '@app/main/config/sentry/sentry-config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: process.env.PATH_ENV }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfig }),
    UserModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: SentryInterceptor,
    },
    SentryConfig,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SentryMiddleware).forRoutes('*');
  }
}
