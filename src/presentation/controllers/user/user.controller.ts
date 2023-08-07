import { AddUserUseCase } from '@app/main/factories/usecases/user/add-user.usecase';
import { AddUserDto } from '@app/presentation/dtos/user/add-user.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private readonly addUserUseCase: AddUserUseCase) {}

  @Post()
  async create(@Body() data: AddUserDto) {
    return await this.addUserUseCase.create(data);
  }
}
