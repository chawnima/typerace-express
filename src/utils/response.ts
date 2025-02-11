import { Response } from "express";

export const successResponse = (
  res: Response,
  message: string,
  data: object,
  status: number = 200
) => {
  res.status(status).json({
    success: true,
    message,
    data,
  });
};
