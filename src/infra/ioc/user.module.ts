import { Hasher } from '@app/data/protocols/cryptography/hasher';
import { AddUserRepository } from '@app/data/protocols/db/user/add-user-repository';
import { LoadUserByEmailRepository } from '@app/data/protocols/db/user/load-user-by-email-repository';
import { AddUserUseCase } from '@app/main/factories/usecases/user/add-user.usecase';
import { Module } from '@nestjs/common';
import { UserRepository } from '../db/repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../db/entities/user.entity';
import { UserController } from '@app/presentation/controllers/user/user.controller';
import { BcryptModule } from '../cryptography/bcrypt-adapter.module';
import { BcryptAdapter } from '../cryptography/bcrypt-adapter';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), BcryptModule],
  providers: [
    UserRepository,
    {
      provide: AddUserUseCase,
      useFactory: (
        addUserRepository: AddUserRepository,
        loadUserByEmailRepository: LoadUserByEmailRepository,
        hasher: Hasher,
      ) => {
        return new AddUserUseCase(
          addUserRepository,
          loadUserByEmailRepository,
          hasher,
        );
      },
      inject: [UserRepository, UserRepository, BcryptAdapter],
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
