import { FilterUserModel } from '@app/domain/models/user/filter-user.model';
import { PageOptionsModel } from '@app/domain/models/user/page-options.model';
import { UserModel } from '@app/domain/models/user/user.model';
import { PaginationResponseDto } from '@app/presentation/dtos/pagination/pagination.dto';

export interface LoadUsersRepository {
  load: (
    filterUserModel: FilterUserModel,
    pageOptionsModel: PageOptionsModel,
  ) => Promise<PaginationResponseDto<UserModel>>;
}
