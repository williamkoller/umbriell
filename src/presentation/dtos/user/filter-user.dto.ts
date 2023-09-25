import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class FilterUserDto {
  @ApiProperty({
    description: 'Name of search',
    example: 'William',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Surname of search',
    example: 'Koller',
  })
  @IsOptional()
  @IsString()
  surname?: string;

  @ApiProperty({
    description: 'E-mail of search',
    example: 'william@mail.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'Active of search',
    example: true,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  active?: boolean;
}
