// import express from "express";

// import { Request, Response } from "express";

// const app = express();

// app.use(express.json());

// app.get("/", (req: Request, res: Response) => {
//   res.json({ message: "D9D9D9" });
// });

// app.listen(3004, () => "Servidor rodando no port 3004");

import { PrismaClient } from '@prisma/client'

// console.log("DATABASE_URL", process.env.DATABASE_URL)

const prisma = new PrismaClient()

async function main() {
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)
}

main()
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })