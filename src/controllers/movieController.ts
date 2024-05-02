import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getMovies = async (req: Request, res: Response) => {
    try {
        const movies = await prisma.movie.findMany();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ error: "Filme não encontrado!" });
    }
    }

export const getMovieById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const movie = await prisma.movie.findUnique({
            where: { 
                id: id 
            },
        });
        if (!movie) { 
            res.status(200).json(movie);
            return
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ error: "Erro Interno de Servidor" });
    }
}

export const getMovieReviews = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const movie = await prisma.movie.findUnique({
            where: {
                id: id,
            },
            include: {
                review : true,
            },
        });
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ error: "Erro Interno de Servidor" });
    }
}

export const createMovie = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    try {
        const movie = await prisma.movie.create({
            data: {
                title,
                description,
            },
        });
        res.status(202).json(movie);
    } catch (error) {
        res.status(500).json({ error: "Erro Interno de Servidor" });
    }
}

export const updateMovie = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const movie = await prisma.movie.update({
            where: {
                id: id,
            },
            data: {
                title,
                description,
            },
        });
        res.status(203).json(movie);
    } catch (error) {
        res.status(500).json({ error: "Erro Interno de Servidor" });
    }
}

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
        res.status(500).json({ error: "Erro Interno de Servidor" });
    }
}