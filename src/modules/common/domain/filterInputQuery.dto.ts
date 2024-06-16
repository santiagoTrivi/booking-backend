import { DataTypeError } from "./exceptions/dataType.expection";

export class FilterInputQueryDto {
  private constructor(
    public page: number,
    public limit: number,
    public search?: string,
    public repost?: boolean
  ) {}

  static create(object: { [key: string]: any }): FilterInputQueryDto {
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
    const search = object.search;
    const repost = object.repost;

    return new FilterInputQueryDto(page, limit, search, repost);
  }
}
