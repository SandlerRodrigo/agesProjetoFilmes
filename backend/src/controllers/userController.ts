import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CreateUserDto } from "../dto/users/createUser.dto";
import { UpdateUserDto } from "../dto/users/updateUser.dto";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const dto: CreateUserDto = req.body;
  try {
    const user = await prisma.user.create({
      data: dto,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const dto: UpdateUserDto = req.body;
  try {
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: dto,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: {
        id: id,
      },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
