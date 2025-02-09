import express, { Request, Response } from "express";
const router = express.Router();

router.route("/single").get(singleRank);

export default router;
