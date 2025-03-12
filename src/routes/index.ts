const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer);
import express from "express";
import rankRouter from "./rank" 
const router = express.Router();

router.use("/rank", rankRouter);

// const socketRouter = (socket) =>{
//     funct(io,socket)
// }

export default router;
