import { UserModel } from '@app/domain/models/user/user.model';
import { AddUserParams } from '@app/domain/usecases/user/add-user/add-user';

export interface AddUserRepository {
  add: (data: AddUserParams) => Promise<UserModel>;
}
