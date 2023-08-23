export class PaginationMetaDto {
  page: number;
  perPage: number;
  total: number;
}

export class PaginationResponseDto<T> {
  meta: PaginationMetaDto;
  data: T[];
}
