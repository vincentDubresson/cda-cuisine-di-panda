import { Request, Response } from "express";
import IngredientTypeRepository from "../models/IngredientType.repository";

export const get = async (req: Request, res: Response): Promise<void> => {
  const ingredientTypes = await IngredientTypeRepository.getIngredientTypes();
  res.json(ingredientTypes);
}