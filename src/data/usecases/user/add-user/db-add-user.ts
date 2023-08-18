import { Hasher } from '@app/data/protocols/cryptography/hasher';
import { AddUserRepository } from '@app/data/protocols/db/user/add-user-repository';
import { LoadUserByEmailRepository } from '@app/data/protocols/db/user/load-user-by-email-repository';
import { UserModel } from '@app/domain/models/user/user.model';
import {
  AddUser,
  AddUserParams,
} from '@app/domain/usecases/user/add-user/add-user';
import { UserPresenter } from '@app/presentation/presenter/user/user.presenter';
import { ConflictException } from '@nestjs/common';

export class DbAddUser implements AddUser {
  constructor(
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly addUserRepository: AddUserRepository,
    private readonly hasher: Hasher,
  ) {}

  async add(data: AddUserParams): Promise<UserModel> {
    const existingUser = await this.loadUserByEmailRepository.loadByEmail(
      data?.email,
    );

    if (existingUser) {
      throw new ConflictException(
        `The email ${data?.email} is already in use.`,
      );
    }

    const hashedPassword = await this.hasher.hash(data.password);

    const newUser = await this.addUserRepository.add(
      Object.assign({}, data, { password: hashedPassword }),
    );

    const formattedUser = new UserPresenter().format(newUser); // Retorna o usuário formatado

    return formattedUser;
  }
}
