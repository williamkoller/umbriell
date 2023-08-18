import { DbLoadUserById } from '@app/data/usecases/user/load-user-by-id/db-load-user-by-id';

export interface DbLoadUserByIdFactory {
  loadDbLoadUserById: () => DbLoadUserById;
}
