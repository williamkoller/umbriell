import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class PageOptionsDto {
  @ApiProperty({
    description: 'Page',
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page?: number;

  @ApiProperty({
    description: 'PerPage',
    example: 5,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  perPage?: number;
}
