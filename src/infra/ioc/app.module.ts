import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from '@app/infra/db/config/typeorm/typeorm-config';
import { UserModule } from './user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: process.env.PATH_ENV }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfig }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
