import express, { Request, Response } from "express";
import "dotenv/config";
import router from "./src/routes";
import { errorHandler, notFoundHandler } from "./src/middlewares/error";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/", router);
app.use("*",notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
