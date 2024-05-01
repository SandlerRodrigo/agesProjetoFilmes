// import express from "express";

// import { Request, Response } from "express";

// const app = express();

// app.use(express.json());

// app.get("/", (req: Request, res: Response) => {
//   res.json({ message: "D9D9D9" });
// });

// app.listen(3004, () => "Servidor rodando no port 3004");

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const review = await prisma.review.create({
    data: {
      rating: 5,
      comment: "Boo is so cute!",
      movie: {
        create: {
          title: "Monster, Inc.",
          description: "screaming children",
        },
      },
      user: {
        create: {
          name: "Rodrigo Sandler",
          email: "rodrigo@sandler",
        },
      },
    },
  });

  console.log(
    await prisma.review.findMany({
      include: {
        movie: true,
        user: true,
      },
    })
  );
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
