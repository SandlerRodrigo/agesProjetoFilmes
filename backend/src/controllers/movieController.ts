import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CreateMovieDto } from "../dto/movies/createMovie.dto";
import { UpdateMovieDto } from "../dto/movies/updateMovie.dto";

const prisma = new PrismaClient();

export const getMovies = async (req: Request, res: Response) => {
  try {
    const movies = await prisma.movie.findMany();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMovieById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const movie = await prisma.movie.findUnique({
      where: {
        id: id,
      },
    });
    if (!movie) {
      res.status(404).json({ error: "Movie not found" });
      return;
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMovieReviews = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const movie = await prisma.movie.findUnique({
      where: {
        id: id,
      },
      include: {
        review: true,
      },
    });
    res.status(200).json({ movie: movie });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createMovie = async (req: Request, res: Response) => {
  const dto: CreateMovieDto = req.body;
  try {
    const movie = await prisma.movie.create({
      data: dto,
    });
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateMovie = async (req: Request, res: Response) => {
  const { id } = req.params;
  const dto: UpdateMovieDto = req.body;
  try {
    const movie = await prisma.movie.update({
      where: {
        id: id,
      },
      data: dto,
    });
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.movie.delete({
      where: {
        id: id,
      },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
