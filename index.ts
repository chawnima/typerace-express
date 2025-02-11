import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import router from "./src/routes";
import { errorHandler, notFoundHandler } from "./src/middlewares/error";

const app = express();
const PORT = process.env.PORT;
const allowedOrigins = process.env.ORIGIN_URL;

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use("/", router);
app.use("*", notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
