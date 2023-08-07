import { Match } from '@app/main/decorator/match.decorator';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AddUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Surname is required' })
  surname: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Age is required' })
  age: number;

  @IsString()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'passwordConfirm confirm is required' })
  @MinLength(4)
  @MaxLength(20)
  @Match('password')
  passwordConfirm: string;
}
