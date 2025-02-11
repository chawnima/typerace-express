import express, { Request, Response } from "express";
import * as rank from "../controllers/rank";
import * as validateRank from "../middlewares/rank";

const router = express.Router();

router
  .route("/single")
  .get(rank.getSingleRank).post(validateRank.singleRankValidation,rank.postSingleRank);

export default router;
