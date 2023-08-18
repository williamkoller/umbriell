import { LoadUsersRepository } from '@app/data/protocols/db/user/load-users-repository';
import { UserModel } from '@app/domain/models/user/user.model';
import { LoadUsers } from '@app/domain/usecases/user/load-users/load-users';
import { UserPresenter } from '@app/presentation/presenter/user/user.presenter';

export class DbLoadUsers implements LoadUsers {
  constructor(private readonly loadUsersRepository: LoadUsersRepository) {}

  async load(): Promise<UserModel[]> {
    const users = await this.loadUsersRepository.load();
    return new UserPresenter().formatArray(users);
  }
}
