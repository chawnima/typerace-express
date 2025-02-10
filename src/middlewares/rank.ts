import {z} from "zod";
import {Request,Response,NextFunction} from "express";
import { BadRequestError } from "../utils/status";

const rankSchema = z.object({
    username:z.string(),
    wpm:z.number(),
    record_date:z.date()
})

export const singleRankValidation = (req:Request,res:Response,next:NextFunction) =>{
    req.body = {
        username: req.body.username,
        wpm: req.body.wpm,
        record_date: new Date(),
    }
    const validation = rankSchema.safeParse(req.body);
    if(!validation.success){
        throw new BadRequestError(validation.error.errors);
    }
    next();
}