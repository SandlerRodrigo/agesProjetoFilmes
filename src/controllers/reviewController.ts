import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CreateReviewDto } from "../dto/reviews/createReview.dto";
import { UpdateReviewDto } from "../dto/reviews/updateReview.dto";

const prisma = new PrismaClient();

export const getReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        Movie: true,
        User: true,
      },
    });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
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
        Movie: true,
        User: true,
      },
    });
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createReview = async (req: Request, res: Response) => {
  const data: CreateReviewDto = req.body;
  try {
    const review = await prisma.review.create({
      data,
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: UpdateReviewDto = req.body;
  try {
    const review = await prisma.review.update({
      where: {
        id: id,
      },
      data,
    });
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
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
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
