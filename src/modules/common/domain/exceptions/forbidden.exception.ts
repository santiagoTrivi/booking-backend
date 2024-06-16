import { DomainError, Issue } from "./domainError";

export class ForbiddenException extends DomainError {
  issues?: Issue[] | undefined;
  statusCode = 403;
  error = "ACCES_DENIED";
  constructor(message: string) {
    super(message);
  }
}
