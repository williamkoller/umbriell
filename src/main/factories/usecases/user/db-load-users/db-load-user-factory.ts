import { LoadUsersRepository } from '@app/data/protocols/db/user/load-users-repository';
import { DbLoadUsers } from '@app/data/usecases/user/load-users/db-load-users';
import { DbLoadUsersFactory } from '@app/domain/factories/user/db-load-users/db-load-users-factory';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DefaultDbLoadUsersFactory implements DbLoadUsersFactory {
  constructor(private readonly loadUsersRepository: LoadUsersRepository) {}

  loadDbLoadUsers(): DbLoadUsers {
    return new DbLoadUsers(this.loadUsersRepository);
  }
}
