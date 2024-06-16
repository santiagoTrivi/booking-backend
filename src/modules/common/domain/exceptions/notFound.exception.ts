import { DomainError, Issue } from "./domainError";

export class NotFoundException extends DomainError {
  issues?: Issue[] | undefined;
  statusCode = 404;
  error = "NOT_FOUND";
  constructor(message: string) {
    super(message);
  }
}
