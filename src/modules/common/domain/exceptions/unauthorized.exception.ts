import { DomainError, Issue } from "./domainError";

export class UnauthorizedError extends DomainError {
  issues?: Issue[] | undefined;
  statusCode = 401;
  error = "UNAUTHORIZED";
  constructor(message: string) {
    super(message);
  }
}
