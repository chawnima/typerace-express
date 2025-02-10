import express, { Request, Response } from "express";
import * as rank from "../controllers/rank";
const router = express.Router();

router.route("/single").get(rank.getSingleRank);

export default router;
