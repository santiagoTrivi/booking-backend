import { DataTypeError } from "./exceptions/dataType.expection";

export class GetPaginationParamsQuryDto {
  constructor(public page: number, public limit: number) {}

  static create(object: { [key: string]: any }): GetPaginationParamsQuryDto {
    if (object.page && object.limit) {
      if (!Number.isInteger(parseInt(object.page))) {
        throw new DataTypeError("page must be an integer");
      }
      if (!Number.isInteger(parseInt(object.limit))) {
        throw new DataTypeError("limit must be an integer");
      }
    }

    const page = parseInt(object.page) || 1;
    const limit = parseInt(object.limit) || 10;

    return new GetPaginationParamsQuryDto(page, limit);
  }
}
