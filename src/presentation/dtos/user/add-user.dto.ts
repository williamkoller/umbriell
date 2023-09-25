import { Match } from '@app/main/decorator/match.decorator';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AddUserDto {
  @ApiProperty({
    description: 'Name of user',
    example: 'William',
  })
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({
    description: 'Surname of user',
    example: 'Koller',
  })
  @IsString()
  @IsNotEmpty({ message: 'Surname is required' })
  surname: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Age is required' })
  age: number;

  @ApiProperty({
    description: 'E-mail of user',
    example: 'william@mail.com',
  })
  @IsString()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    description: 'Password of user',
    example: 'AnyPassword!@#',
  })
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  password: string;

  @ApiProperty({
    description: 'passwordConfirm of user',
    example: 'AnyPassword!@#',
  })
  @IsString()
  @IsNotEmpty({ message: 'passwordConfirm confirm is required' })
  @MinLength(4)
  @MaxLength(20)
  @Match('password')
  passwordConfirm: string;
}
