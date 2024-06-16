import { DomainError, Issue } from "./domainError";

export class InternalServerError extends DomainError {
  issues?: Issue[] | undefined;
  statusCode = 500;
  error = "INTERNAL_SERVER_ERROR";
  constructor(message: string, private property: string) {
    super(message);
  }
}
