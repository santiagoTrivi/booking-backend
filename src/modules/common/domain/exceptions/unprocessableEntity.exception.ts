import { DomainError, Issue } from "./domainError";

export class UnprocessableEntityError extends DomainError {
  issues: Issue[];
  statusCode = 422;
  error = "UNPROCESSABLE ENTITY";
  constructor(issues: Issue[]) {
    super("data not valid");
    this.issues = issues;
  }
}
