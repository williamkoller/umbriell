import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDto {
  @ApiProperty({
    example: {
      page: 1,
      perPage: 5,
      total: 1,
    },
  })
  meta: object;

  @ApiProperty({
    example: [
      {
        id: 1,
        name: 'William',
        surname: 'Koller',
        email: 'william@mail.com',
        password:
          '$2a$12$yb0I8pGVU1d2F0fT815WTOahMZqXpG3DBfXz6ANHqInMTb5MXrwCW',
      },
    ],
  })
  data: object[];
}
