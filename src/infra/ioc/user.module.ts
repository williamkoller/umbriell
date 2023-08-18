import { Hasher } from '@app/data/protocols/cryptography/hasher';
import { AddUserRepository } from '@app/data/protocols/db/user/add-user-repository';
import { LoadUserByEmailRepository } from '@app/data/protocols/db/user/load-user-by-email-repository';
import { Module } from '@nestjs/common';
import { UserRepository } from '../db/repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../db/entities/user.entity';
import { UserController } from '@app/presentation/controllers/user/user.controller';
import { BcryptModule } from '../cryptography/bcrypt-adapter.module';
import { BcryptAdapter } from '../cryptography/bcrypt-adapter';
import { DefaultDbAddUserFactory } from '@app/main/factories/usecases/user/db-add-user/db-add-user-factory';
import { DefaultDbLoadUsersFactory } from '@app/main/factories/usecases/user/db-load-users/db-load-user-factory';
import { LoadUsersRepository } from '@app/data/protocols/db/user/load-users-repository';
import { DefaultDbLoadUserByIdFactory } from '@app/main/factories/usecases/user/db-load-user-by-id/db-load-user-by-id-factory';
import { LoadUserByIdRepository } from '@app/data/protocols/db/user/load-user-by-id-repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), BcryptModule],
  providers: [
    UserRepository,
    {
      provide: DefaultDbAddUserFactory,
      useFactory: (
        addUserRepository: AddUserRepository,
        loadUserByEmailRepository: LoadUserByEmailRepository,
        hasher: Hasher,
      ) => {
        return new DefaultDbAddUserFactory(
          loadUserByEmailRepository,
          addUserRepository,
          hasher,
        );
      },
      inject: [UserRepository, UserRepository, BcryptAdapter],
    },
    {
      provide: DefaultDbLoadUsersFactory,
      useFactory: (loadUsersRepository: LoadUsersRepository) => {
        return new DefaultDbLoadUsersFactory(loadUsersRepository);
      },
      inject: [UserRepository],
    },
    {
      provide: DefaultDbLoadUserByIdFactory,
      useFactory: (loadUserByIdRepository: LoadUserByIdRepository) => {
        return new DefaultDbLoadUserByIdFactory(loadUserByIdRepository);
      },
      inject: [UserRepository],
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
