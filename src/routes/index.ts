import express from "express";
import rankRouter from "./rank" 
const router = express.Router();

router.use("/rank", rankRouter);

export default router;
