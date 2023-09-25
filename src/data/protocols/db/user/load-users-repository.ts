import { FilterUserModel } from '@app/domain/models/user/filter-user.model';
import { PageOptionsModel } from '@app/domain/models/user/page-options.model';
import { UserModel } from '@app/domain/models/user/user.model';

export interface LoadUsersRepository {
  load: (
    filterUserModel: FilterUserModel,
    pageOptionsModel: PageOptionsModel,
    skip: number,
  ) => Promise<{ users: UserModel[]; total: number }>;
}
