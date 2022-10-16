import { Request, Response } from "express";
import IngredientTypeRepository from "../models/IngredientType.repository";
import { getErrorMessage } from "../utils";

export const get = async (req: Request, res: Response): Promise<void> => {
  const ingredientTypes = await IngredientTypeRepository.getIngredientTypes();
  res.json(ingredientTypes);
}

export const getById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const ingredientType = await IngredientTypeRepository.getIngredientTypesById(id);
    res.status(201).json(ingredientType);
  } catch (error) {
    res.status(404).json({ error: getErrorMessage(error)});
  }
};

export const post = async (req: Request, res: Response): Promise<void> => {
  
}

export const put = async (req: Request, res: Response): Promise<void> => {
  
}

export const del = async (req: Request, res: Response): Promise<void> => {
  
}