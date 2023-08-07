import { UserModel } from '@app/domain/models/user/user.model';

export interface AddUserRepository {
  add: (data: UserModel) => Promise<UserModel>;
}
