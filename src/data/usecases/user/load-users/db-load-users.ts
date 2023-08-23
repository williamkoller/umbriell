import { LoadUsersRepository } from '@app/data/protocols/db/user/load-users-repository';
import { FilterUserModel } from '@app/domain/models/user/filter-user.model';
import { PageOptionsModel } from '@app/domain/models/user/page-options.model';
import { UserModel } from '@app/domain/models/user/user.model';
import { LoadUsers } from '@app/domain/usecases/user/load-users/load-users';
import { PaginationResponseDto } from '@app/presentation/dtos/pagination/pagination.dto';
import { NotFoundException } from '@nestjs/common';

export class DbLoadUsers implements LoadUsers {
  constructor(private readonly loadUsersRepository: LoadUsersRepository) {}

  async load(
    filterUserModel: FilterUserModel,
    pageOptionsModel: PageOptionsModel,
  ): Promise<PaginationResponseDto<UserModel>> {
    const paginationResponse: PaginationResponseDto<UserModel> =
      await this.loadUsersRepository.load(filterUserModel, pageOptionsModel);

    if (paginationResponse.meta.total === 0) {
      throw new NotFoundException(
        `User with email ${filterUserModel.email} not found`,
      );
    }

    return paginationResponse;
  }
}
