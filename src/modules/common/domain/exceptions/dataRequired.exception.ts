import { DomainError, Issue } from "./domainError";

export class DataRequiredError extends DomainError {
  issues?: Issue[] | undefined;
  statusCode = 400;
  error = "DATA REQUIRED";
  constructor(message: string) {
    super(message);
  }
}
