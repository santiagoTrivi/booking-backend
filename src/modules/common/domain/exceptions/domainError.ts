export interface Issue {
  field: string;
  message: string;
}

export abstract class DomainError extends Error {
  abstract statusCode: number;
  abstract error: string;
  abstract issues?: Issue[];

  constructor(message: string) {
    super(message);
  }
}
