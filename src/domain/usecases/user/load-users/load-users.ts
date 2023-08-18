import { UserModel } from '@app/domain/models/user/user.model';

export interface LoadUsers {
  load: () => Promise<UserModel[]>;
}
