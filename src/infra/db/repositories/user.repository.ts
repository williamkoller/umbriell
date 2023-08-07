import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { AddUserRepository } from '@app/data/protocols/db/user/add-user-repository';
import { UserModel } from '@app/domain/models/user/user.model';
import { Injectable } from '@nestjs/common';
import { LoadUserByEmailRepository } from '@app/data/protocols/db/user/load-user-by-email-repository';

@Injectable()
export class UserRepository
  implements AddUserRepository, LoadUserByEmailRepository
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async add(data: UserModel): Promise<UserModel> {
    const user = this.userRepository.create(data);
    await this.userRepository.save(user);
    return user;
  }

  async loadByEmail(email: string): Promise<UserModel> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }
}
