import { Issue } from "./exceptions/domainError";

export interface HttptErrorResponse {
  error: string;
  message: string;
  statusCode: number;
  issues?: Issue[];
}
