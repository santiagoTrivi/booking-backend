import { GetPaginationParamsQuryDto } from "./getPaginationParamsQuery.dto";

export class FieldQuery<T> extends GetPaginationParamsQuryDto {
  private constructor(
    public field: Partial<T>,
    page: number = 1,
    limit: number = 10
  ) {
    super(page, limit);
  }

  static create<U>(
    field: Partial<U>,
    page: number = 1,
    limit: number = 10
  ): FieldQuery<U> {
    return new FieldQuery<U>(field, page, limit);
  }
}
