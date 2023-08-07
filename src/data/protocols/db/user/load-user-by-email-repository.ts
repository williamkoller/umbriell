import { UserModel } from '@app/domain/models/user/user.model';

export interface LoadUserByEmailRepository {
  loadByEmail: (email: string) => Promise<UserModel>;
}
