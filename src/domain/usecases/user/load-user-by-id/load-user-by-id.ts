import { UserModel } from '@app/domain/models/user/user.model';

export interface LoadUserById {
  loadById: (id: number) => Promise<UserModel>;
}
