import { LoadUserByIdRepository } from '@app/data/protocols/db/user/load-user-by-id-repository';
import { UserModel } from '@app/domain/models/user/user.model';
import { LoadUserById } from '@app/domain/usecases/user/load-user-by-id/load-user-by-id';
import { UserPresenter } from '@app/presentation/presenter/user/user.presenter';
import { NotFoundException } from '@nestjs/common';

export class DbLoadUserById implements LoadUserById {
  constructor(
    private readonly loadUserByIdRepository: LoadUserByIdRepository,
  ) {}

  async loadById(id: number): Promise<UserModel> {
    const user = await this.loadUserByIdRepository.loadById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return new UserPresenter().format(user);
  }
}
