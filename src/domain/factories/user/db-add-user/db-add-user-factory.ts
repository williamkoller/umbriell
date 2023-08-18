import { DbAddUser } from '@app/data/usecases/user/add-user/db-add-user';

export interface DbAddUserFactory {
  createDbAddUser: () => DbAddUser;
}
