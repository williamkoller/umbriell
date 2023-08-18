import { LoadUserByEmailRepository } from '@app/data/protocols/db/user/load-user-by-email-repository';
import { AddUserRepository } from '@app/data/protocols/db/user/add-user-repository';
import { Hasher } from '@app/data/protocols/cryptography/hasher';
import { UserModel } from '@app/domain/models/user/user.model';
import { UserPresenter } from '@app/presentation/presenter/user/user.presenter';
import { ConflictException } from '@nestjs/common';
import { DbAddUser } from './db-add-user';

describe('DbAddUser', () => {
  let dbAddUser: DbAddUser;
  let loadUserByEmailRepository: LoadUserByEmailRepository;
  let addUserRepository: AddUserRepository;
  let hasher: Hasher;

  beforeEach(() => {
    loadUserByEmailRepository = {
      loadByEmail: jest.fn(),
    };
    addUserRepository = {
      add: jest.fn(),
    };
    hasher = {
      hash: jest.fn(),
    };

    dbAddUser = new DbAddUser(
      loadUserByEmailRepository,
      addUserRepository,
      hasher,
    );
  });

  describe('AddUser', () => {
    it('should throw ConflictException if email is already in use', async () => {
      // Arrange
      const email = 'test@example.com';
      const data = {
        email,
        password: 'test123',
      };

      loadUserByEmailRepository.loadByEmail = jest
        .fn()
        .mockResolvedValue(email);

      // Act & Assert
      await expect(dbAddUser.add(data)).rejects.toThrow(ConflictException);
      expect(loadUserByEmailRepository.loadByEmail).toHaveBeenCalledWith(email);
    });

    it('should add a new user and return the formatted user', async () => {
      // Arrange
      const email = 'test@example.com';
      const data = {
        email,
        password: 'test123',
      };
      const hashedPassword = 'hashed-password';
      const newUser: UserModel = {
        id: 1,
        name: 'Existing User',
        surname: 'Existing Surname',
        age: 20,
        active: true,
        email,
        password: 'hashed-password',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      loadUserByEmailRepository.loadByEmail = jest
        .fn()
        .mockResolvedValue(undefined);

      hasher.hash = jest
        .fn()
        .mockImplementation(() => Promise.resolve(hashedPassword));

      addUserRepository.add = jest
        .fn()
        .mockImplementation(() => Promise.resolve(newUser));

      // Act
      const result = await dbAddUser.add(data);

      // Assert
      expect(result).toEqual(new UserPresenter().format(newUser));
      expect(hasher.hash).toHaveBeenCalledWith(data.password);
      expect(addUserRepository.add).toHaveBeenCalledWith({
        email,
        password: hashedPassword,
      });
    });
  });
});
