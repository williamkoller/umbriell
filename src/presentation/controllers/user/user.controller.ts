import { DbAddUser } from '@app/data/usecases/user/add-user/db-add-user';
import { DbLoadUserById } from '@app/data/usecases/user/load-user-by-id/db-load-user-by-id';
import { DbLoadUsers } from '@app/data/usecases/user/load-users/db-load-users';
import { DefaultDbAddUserFactory } from '@app/main/factories/usecases/user/db-add-user/db-add-user-factory';
import { DefaultDbLoadUserByIdFactory } from '@app/main/factories/usecases/user/db-load-user-by-id/db-load-user-by-id-factory';
import { DefaultDbLoadUsersFactory } from '@app/main/factories/usecases/user/db-load-users/db-load-user-factory';
import { AddUserDto } from '@app/presentation/dtos/user/add-user.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(
    private readonly dbAddUserFactory: DefaultDbAddUserFactory,
    private readonly dbLoadUsersFactory: DefaultDbLoadUsersFactory,
    private readonly dbLoadUserByIdFactory: DefaultDbLoadUserByIdFactory,
  ) {}

  @Post()
  async create(@Body() data: AddUserDto) {
    const dbAddUser: DbAddUser = this.dbAddUserFactory.createDbAddUser();
    return await dbAddUser.add(data);
  }

  @Get()
  async load() {
    const dbLoadUsers: DbLoadUsers = this.dbLoadUsersFactory.loadDbLoadUsers();
    return await dbLoadUsers.load();
  }

  @Get(':id')
  async loadById(@Param('id') id: number) {
    const dbLoadUsers: DbLoadUserById =
      this.dbLoadUserByIdFactory.loadDbLoadUserById();
    return await dbLoadUsers.loadById(id);
  }
}
