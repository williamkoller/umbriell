import { DbAddUser } from '@app/data/usecases/user/add-user/db-add-user';
import { DbLoadUserById } from '@app/data/usecases/user/load-user-by-id/db-load-user-by-id';
import { DbLoadUsers } from '@app/data/usecases/user/load-users/db-load-users';
import { CustomSentryInterceptor } from '@app/main/common/interceptor/custom-sentry.intercepor';
import { SentryInterceptor } from '@app/main/common/interceptor/sentry.interceptor';
import { DefaultDbAddUserFactory } from '@app/main/factories/usecases/user/db-add-user/db-add-user-factory';
import { DefaultDbLoadUserByIdFactory } from '@app/main/factories/usecases/user/db-load-user-by-id/db-load-user-by-id-factory';
import { DefaultDbLoadUsersFactory } from '@app/main/factories/usecases/user/db-load-users/db-load-user-factory';
import { PageOptionsDto } from '@app/presentation/dtos/pagination/page-options.dto';
import { ResponseUserDto } from '@app/presentation/dtos/response/response-user.dto';
import { AddUserDto } from '@app/presentation/dtos/user/add-user.dto';
import { FilterUserDto } from '@app/presentation/dtos/user/filter-user.dto';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
@UseInterceptors(SentryInterceptor, CustomSentryInterceptor)
export class UserController {
  constructor(
    private readonly dbAddUserFactory: DefaultDbAddUserFactory,
    private readonly dbLoadUsersFactory: DefaultDbLoadUsersFactory,
    private readonly dbLoadUserByIdFactory: DefaultDbLoadUserByIdFactory,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'Create a new user.',
    type: AddUserDto,
    content: {
      'application/json': {
        example: AddUserDto,
      },
    },
  })
  async create(@Body() data: AddUserDto) {
    const dbAddUser: DbAddUser = this.dbAddUserFactory.createDbAddUser();
    return await dbAddUser.add(data);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Load all users, with pagination',
    type: ResponseUserDto,
    content: {
      'application/json': {
        example: ResponseUserDto,
      },
    },
  })
  async load(
    @Query() filterUserDto: FilterUserDto,
    @Query() pageOptionsDto: PageOptionsDto,
  ) {
    const dbLoadUsers: DbLoadUsers = this.dbLoadUsersFactory.loadDbLoadUsers();
    return await dbLoadUsers.load(filterUserDto, pageOptionsDto);
  }

  @Get(':id')
  async loadById(@Param('id') id: number) {
    const dbLoadUsers: DbLoadUserById =
      this.dbLoadUserByIdFactory.loadDbLoadUserById();
    return await dbLoadUsers.loadById(id);
  }
}
