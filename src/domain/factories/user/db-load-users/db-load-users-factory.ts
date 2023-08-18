import { DbLoadUsers } from '@app/data/usecases/user/load-users/db-load-users';

export interface DbLoadUsersFactory {
  loadDbLoadUsers: () => DbLoadUsers;
}
