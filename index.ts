import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import { Server } from "socket.io";

import router from "./src/routes";
import { errorHandler, notFoundHandler } from "./src/middlewares/error";
import { createServer } from "node:http";
import { SocketServer } from "./src/socket";

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

const app = express();
const server = createServer(app);

const PORT = Number(process.env.PORT) || 3000;
const HOST_ADDRESS = process.env.HOST_ADDRESS || "";
const allowedOrigins = process.env.ORIGIN_URL?.split(",") || [];


app.use(express.json());
app.use(cors({ origin: allowedOrigins }));
app.use("/", router);

const socket = new SocketServer(server);

app.use("*", notFoundHandler);
app.use(errorHandler);

server.listen(PORT, HOST_ADDRESS, () => {
  console.log(`Server running on port ${HOST_ADDRESS}:${PORT}`);
});
