import express, { Request, Response } from "express";
import router from "./src/routes";
const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
