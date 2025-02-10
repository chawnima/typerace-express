import { ZodIssue } from "zod";

export interface RequestError {
  status: number;
  errors: ZodIssue[] | string;
}

export class BadRequestError extends Error implements RequestError {
  status: number;
  errors: ZodIssue[];
  constructor(message: ZodIssue[]) {
    super("Bad Request");
    this.status = 400;
    this.errors = message;
  }
}

export class NotFoundError extends Error implements RequestError {
  status: number;
  errors: string;
  constructor(message: string) {
    super("Not Found");
    this.status = 404;
    this.errors = message;
  }
}
