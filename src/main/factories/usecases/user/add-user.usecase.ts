import { Hasher } from '@app/data/protocols/cryptography/hasher';
import { AddUserRepository } from '@app/data/protocols/db/user/add-user-repository';
import { LoadUserByEmailRepository } from '@app/data/protocols/db/user/load-user-by-email-repository';
import { AddUserDto } from '@app/presentation/dtos/user/add-user.dto';
import { ConflictException } from '@nestjs/common';

export class AddUserUseCase {
  constructor(
    private readonly addUserRepository: AddUserRepository,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hasher: Hasher,
  ) {}

  async create(data: AddUserDto) {
    const userExists = await this.loadUserByEmailRepository.loadByEmail(
      data?.email,
    );

    if (userExists) {
      throw new ConflictException(`Email ${data?.email} already exists`);
    }

    return await this.addUserRepository.add(
      Object.assign({}, data, {
        password: await this.hasher.hash(data?.password),
      }),
    );
  }
}
