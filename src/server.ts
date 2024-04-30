import express from "express";

import { Request, Response } from "express";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "D9D9D9" });
});

app.listen(3004, () => "Servidor rodando no port 3004");