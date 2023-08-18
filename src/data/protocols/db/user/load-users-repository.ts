import { UserModel } from '@app/domain/models/user/user.model';

export interface LoadUsersRepository {
  load: () => Promise<UserModel[]>;
}
