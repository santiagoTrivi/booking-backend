import { DomainError, Issue } from "./domainError";

export class DataTypeError extends DomainError {
  issues?: Issue[] | undefined;
  statusCode = 400;
  error = "DATA TYPE ERROR";
  constructor(message: string) {
    super(message);
  }
}
