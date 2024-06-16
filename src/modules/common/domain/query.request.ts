import { DataTypeError } from "./exceptions/dataType.expection";

export class QueryRequest<T> {
  public readonly page: number;
  public readonly limit: number;
  public readonly filter?: Partial<T>;
  constructor(page: number = 1, limit: number = 10, filter?: Partial<T>) {
    this.page = page;
    this.limit = limit;
    this.filter = filter;
  }
}
