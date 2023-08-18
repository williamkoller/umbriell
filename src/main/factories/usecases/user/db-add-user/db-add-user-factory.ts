import { Hasher } from '@app/data/protocols/cryptography/hasher';
import { AddUserRepository } from '@app/data/protocols/db/user/add-user-repository';
import { LoadUserByEmailRepository } from '@app/data/protocols/db/user/load-user-by-email-repository';
import { DbAddUser } from '@app/data/usecases/user/add-user/db-add-user';
import { DbAddUserFactory } from '@app/domain/factories/user/db-add-user/db-add-user-factory';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DefaultDbAddUserFactory implements DbAddUserFactory {
  constructor(
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly addUserRepository: AddUserRepository,
    private readonly hasher: Hasher,
  ) {}

  createDbAddUser(): DbAddUser {
    return new DbAddUser(
      this.loadUserByEmailRepository,
      this.addUserRepository,
      this.hasher,
    );
  }
}
