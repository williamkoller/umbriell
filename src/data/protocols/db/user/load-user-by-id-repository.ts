import { UserModel } from '@app/domain/models/user/user.model';

export interface LoadUserByIdRepository {
  loadById: (id: number) => Promise<UserModel>;
}
