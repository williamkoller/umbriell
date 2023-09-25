import { LoadUsersRepository } from '@app/data/protocols/db/user/load-users-repository';
import { FilterUserModel } from '@app/domain/models/user/filter-user.model';
import { PageOptionsModel } from '@app/domain/models/user/page-options.model';
import { UserModel } from '@app/domain/models/user/user.model';
import { LoadUsers } from '@app/domain/usecases/user/load-users/load-users';
import {
  PaginationMetaDto,
  PaginationResponseDto,
} from '@app/presentation/dtos/pagination/pagination.dto';
import { UserPresenter } from '@app/presentation/presenter/user/user.presenter';
import { NotFoundException } from '@nestjs/common';

export class DbLoadUsers implements LoadUsers {
  constructor(private readonly loadUsersRepository: LoadUsersRepository) {}

  async load(
    filterUserModel: FilterUserModel,
    pageOptionsModel: PageOptionsModel,
  ): Promise<PaginationResponseDto<UserModel>> {
    const skip =
      (Number(pageOptionsModel.page) - 1) * Number(pageOptionsModel.perPage);

    const loadUsers: { users: UserModel[]; total: number } =
      await this.loadUsersRepository.load(
        filterUserModel,
        pageOptionsModel,
        skip,
      );

    if (loadUsers.total === 0) {
      throw new NotFoundException('No records found.');
    }

    const page = Number(pageOptionsModel.page) || 1;
    const perPage = Number(pageOptionsModel.perPage) || 10;

    const paginationMeta: PaginationMetaDto = {
      page,
      perPage,
      total: loadUsers.total,
    };

    return {
      meta: paginationMeta,
      data: loadUsers.users.map((user) => new UserPresenter().format(user)),
    };
  }
}
