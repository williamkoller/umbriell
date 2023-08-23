import { AddUserRepository } from '@app/data/protocols/db/user/add-user-repository';
import { LoadUserByEmailRepository } from '@app/data/protocols/db/user/load-user-by-email-repository';
import { LoadUserByIdRepository } from '@app/data/protocols/db/user/load-user-by-id-repository';
import { LoadUsersRepository } from '@app/data/protocols/db/user/load-users-repository';
import { FilterUserModel } from '@app/domain/models/user/filter-user.model';
import { PageOptionsModel } from '@app/domain/models/user/page-options.model';
import { UserModel } from '@app/domain/models/user/user.model';
import {
  PaginationMetaDto,
  PaginationResponseDto,
} from '@app/presentation/dtos/pagination/pagination.dto';
import { UserPresenter } from '@app/presentation/presenter/user/user.presenter';
import { Injectable, NotFoundException } from '@nestjs/common';
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
  ): Promise<PaginationResponseDto<UserModel>> {
    const skip =
      (Number(pageOptionsModel.page) - 1) * Number(pageOptionsModel.perPage);

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
          } else if (filterKey === 'active') {
            queryBuilder = queryBuilder.andWhere(
              `user.${filterKey} = :${filterKey}`,
              { [filterKey]: filterValue },
            );
          } else if (filterKey === 'email') {
            const usersWithEmail = await queryBuilder
              .andWhere(`user.${filterKey} = :${filterKey}`, {
                [filterKey]: filterValue,
              })
              .getCount();

            if (usersWithEmail === 0) {
              throw new NotFoundException(
                'No user found with the provided email.',
              );
            }

            queryBuilder = queryBuilder.andWhere(
              `user.${filterKey} = :${filterKey}`,
              { [filterKey]: filterValue },
            );
          }
        }
      }

      const [users, total] = await queryBuilder
        .skip(skip)
        .take(pageOptionsModel.perPage)
        .getManyAndCount();

      const paginationMeta: PaginationMetaDto = {
        page: pageOptionsModel.page,
        perPage: pageOptionsModel.perPage,
        total,
      };

      return {
        meta: paginationMeta,
        data: users.map((user) => new UserPresenter().format(user)),
      };
    }
  }

  async loadById(id: number): Promise<UserModel> {
    return await this.userRepository.findOne({ where: { id } });
  }
}
