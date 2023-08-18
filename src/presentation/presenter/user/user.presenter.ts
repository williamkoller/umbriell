import { UserModel } from '@app/domain/models/user/user.model';
import { BasePresenter } from '../base/base.presenter';

export class UserPresenter extends BasePresenter<UserModel> {
  constructor() {
    super((user) => {
      const formattedUser = {
        id: user.id,
        name: user.name,
        surname: user.surname,
        age: user.age,
        active: user.active,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
      return formattedUser;
    });
  }

  formatArray(users: UserModel[]): UserModel[] {
    return users.map((user) => this.format(user));
  }
}
