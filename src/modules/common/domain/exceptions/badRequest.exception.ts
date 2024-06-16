import { DomainError, Issue } from "./domainError";

export class BadRequestError extends DomainError {
  issues?: Issue[] | undefined;
  statusCode = 400;
  error = "BAD_REQUEST";
  constructor(message: string, error: string) {
    super(message);
    this.error = `${this.error}: ${error}`;
  }
}
