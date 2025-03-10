import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import { Server } from "socket.io";

import router from "./src/routes";
import { errorHandler, notFoundHandler } from "./src/middlewares/error";
import { createServer } from "node:http";

const app = express();
const server = createServer(app);

const PORT = Number(process.env.PORT) || 3000;
const HOST_ADDRESS = process.env.HOST_ADDRESS || "";
const allowedOrigins = process.env.ORIGIN_URL?.split(",") || [];

const io = new Server(server,{cors:{origin:allowedOrigins}});
app.use(express.json());
app.use(cors({ origin: allowedOrigins }));
app.use("/", router);

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("message",(data)=>{
    console.log(data);
  })
});

app.use("*", notFoundHandler);
app.use(errorHandler);

server.listen(PORT, HOST_ADDRESS, () => {
  console.log(`Server running on port ${HOST_ADDRESS}:${PORT}`);
});
