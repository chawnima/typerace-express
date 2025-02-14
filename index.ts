import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import router from "./src/routes";
import { errorHandler, notFoundHandler } from "./src/middlewares/error";

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST_ADDRESS = process.env.HOST_ADDRESS || "";
const allowedOrigins = process.env.ORIGIN_URL?.split(",") || [];

app.use(express.json());
app.use(cors({ origin: allowedOrigins }));
app.use("/", router);
app.use("*", notFoundHandler);
app.use(errorHandler);

app.listen(PORT, HOST_ADDRESS, () => {
  console.log(`Server running on port ${PORT}`);
});
