import { Request, Response } from "express";
import * as rankService from "../services/rank";

export const getSingleRank = async (req: Request, res: Response) => {
  const result = await rankService.getSingleRank();
  res.send(result);
};
