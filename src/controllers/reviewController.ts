import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        movie: true,
        user: true,
      },
    });

    res.json(reviews);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro de Servidor Interno ao buscar reviews" });
  }
};

export const getReviewsById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const review = await prisma.review.findFirst({
      where: {
        id: id,
      },
      include: {
        movie: true,
        user: true,
      },
    });

    res.json(review);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro de Servidor Interno ao buscar review" });
  }
};

export const createReview = async (req: Request, res: Response) => {
  const { rating, comment, movieId, userId } = req.body;

  try {
    const review = await prisma.review.create({
      data: {
        rating,
        comment,
        movieId,
        userId,
      },
    });

    res.json(review);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro de Servidor Interno ao criar review" });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  try {
    const review = await prisma.review.update({
      where: {
        id: id,
      },
      data: {
        rating,
        comment,
      },
    });

    res.json(review);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro de Servidor Interno ao atualizar review" });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.review.delete({
      where: {
        id: id,
      },
    });

    res.json({ message: "Review deletado com sucesso!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro de Servidor Interno ao deletar review" });
  }
};
