import { UserModel } from '@app/domain/models/user/user.model';

export type AddUserParams = Partial<Omit<UserModel, 'id'>>;

export interface AddUser {
  add: (data: AddUserParams) => Promise<UserModel>;
}
