import express from "express";

import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

const app = express();

const prisma = new PrismaClient();

app.use(express.json());

app.use("/", require("./routes/reviewsRoutes"));

app.listen(3004, () => "Servidor rodando no port 3004");

async function main() {
  // const review = await prisma.review.create({
  //   data: {
  //     rating: 5,
  //     comment: "Boo is so cute!",
  //     movie: {
  //       create: {
  //         title: "Monster, Inc.",
  //         description: "screaming children",
  //       },
  //     },
  //     user: {
  //       create: {
  //         name: "Rodrigo Sandler",
  //         email: "rodrigo@sandler",
  //       },
  //     },
  //   },
  // });

  // console.log(review);
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });