import { DomainError, Issue } from "./domainError";

export class AuthenticationException extends DomainError {
  issues?: Issue[] | undefined;
  statusCode = 401;
  error = "NOT_AUTHENTICATED";
  constructor(message: string, error?: string) {
    super(message);
    this.error = error ? `${this.error}: ${error}` : this.error;
  }
}
