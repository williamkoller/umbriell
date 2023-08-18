import { LoadUserByIdRepository } from '@app/data/protocols/db/user/load-user-by-id-repository';
import { DbLoadUserById } from '@app/data/usecases/user/load-user-by-id/db-load-user-by-id';
import { DbLoadUserByIdFactory } from '@app/domain/factories/user/db-load-user-by-id/db-load-user-by-id-factory';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DefaultDbLoadUserByIdFactory implements DbLoadUserByIdFactory {
  constructor(
    private readonly loadUserByIdRepository: LoadUserByIdRepository,
  ) {}

  loadDbLoadUserById(): DbLoadUserById {
    return new DbLoadUserById(this.loadUserByIdRepository);
  }
}
