import { Request, Response, NextFunction } from "express";
import { NotFoundError, RequestError } from "../utils/status";

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  throw new NotFoundError("Route not found");
};

export const errorHandler = (
  err: RequestError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = status === 500 ? "Internal Server Error" : err.errors;

  res.status(status).json({
    success: false,
    data: null,
    message,
  });
};
