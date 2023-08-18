import { DbAddUser } from '@app/data/usecases/user/add-user/db-add-user';
import { DefaultDbAddUserFactory } from './db-add-user-factory';
import { LoadUserByEmailRepository } from '@app/data/protocols/db/user/load-user-by-email-repository';
import { AddUserRepository } from '@app/data/protocols/db/user/add-user-repository';
import { Hasher } from '@app/data/protocols/cryptography/hasher';

jest.mock('@app/data/usecases/user/add-user/db-add-user'); // Mock DbAddUser

describe('DefaultDbAddUserFactory', () => {
  it('should create a DbAddUser instance', () => {
    const loadUserByEmailRepositoryStub: LoadUserByEmailRepository = {
      loadByEmail: jest.fn(),
    };
    const addUserRepositoryStub: AddUserRepository = {
      add: jest.fn(),
    };
    const hasherStub: Hasher = {
      hash: jest.fn(),
    };

    const factory = new DefaultDbAddUserFactory(
      loadUserByEmailRepositoryStub,
      addUserRepositoryStub,
      hasherStub,
    );

    const dbAddUserInstance = factory.createDbAddUser();

    expect(dbAddUserInstance).toBeInstanceOf(DbAddUser);

    expect(DbAddUser).toHaveBeenCalledWith(
      loadUserByEmailRepositoryStub,
      addUserRepositoryStub,
      hasherStub,
    );
  });
});
