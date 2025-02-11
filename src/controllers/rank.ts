import { Request, Response } from "express";
import * as rankService from "../services/rank";
import { successResponse } from "../utils/response";

export const getSingleRank = async (req: Request, res: Response) => {
  const result = await rankService.getSingleRank();
  successResponse(res, "Data get", result, 200);
};

export const postSingleRank = async (req: Request, res: Response) => {
  const result = await rankService.postSingleRank(req.body.username, req.body.wpm, req.body.record_date);
  successResponse(res, "Data added", result, 201)
}
