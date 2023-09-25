import { AddUserRepository } from '@app/data/protocols/db/user/add-user-repository';
import { LoadUserByEmailRepository } from '@app/data/protocols/db/user/load-user-by-email-repository';
import { LoadUserByIdRepository } from '@app/data/protocols/db/user/load-user-by-id-repository';
import { LoadUsersRepository } from '@app/data/protocols/db/user/load-users-repository';
import { FilterUserModel } from '@app/domain/models/user/filter-user.model';
import { PageOptionsModel } from '@app/domain/models/user/page-options.model';
import { UserModel } from '@app/domain/models/user/user.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository
  implements
    AddUserRepository,
    LoadUserByEmailRepository,
    LoadUsersRepository,
    LoadUserByIdRepository
{
  private skipNumberDefault = 1;
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

  async load(
    filterUserModel: FilterUserModel,
    pageOptionsModel: PageOptionsModel,
    skip: number,
  ): Promise<{ users: UserModel[]; total: number }> {
    let queryBuilder: SelectQueryBuilder<UserEntity> =
      this.userRepository.createQueryBuilder('user');

    if (filterUserModel) {
      for (const filterKey of Object.keys(filterUserModel)) {
        const filterValue = filterUserModel[filterKey];

        if (filterValue !== undefined && filterValue !== null) {
          if (filterKey === 'name' || filterKey === 'surname') {
            queryBuilder = queryBuilder.andWhere(
              `UPPER(user.name) LIKE :name OR UPPER(user.surname) LIKE :surname`,
              {
                name: `%${filterValue.toUpperCase()}%`,
                surname: `%${filterValue.toUpperCase()}%`,
              },
            );
          }

          let condition = {};
          if (filterKey === 'email' || filterKey === 'active') {
            condition[filterKey] = filterValue;
          }

          if (filterKey === 'email') {
            queryBuilder = queryBuilder.where(condition);
          }

          queryBuilder = queryBuilder.andWhere(condition);
        }
      }

      const page = Number(pageOptionsModel.page);
      const perPage = Number(pageOptionsModel.perPage);
      const skipNumberDefault = this.skipNumberDefault;
      const defaultPerPage = 10;
      const skipDefault = Math.max(page ? page - skipNumberDefault : 0, 0);

      const [users, total] = await queryBuilder
        .skip(skip || skipDefault)
        .take(perPage || defaultPerPage)
        .getManyAndCount();

      return { users, total };
    }
  }

  async loadById(id: number): Promise<UserModel> {
    return await this.userRepository.findOne({ where: { id } });
  }
}
