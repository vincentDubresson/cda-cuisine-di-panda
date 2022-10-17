import { Request, Response } from "express";
import IngredientTypeRepository from "../models/IngredientTypes/IngredientType.repository";
import { ingredientTypeValidation } from "../models/IngredientTypes/IngredientType.service";
import { getErrorMessage } from "../utils";

export const get = async (req: Request, res: Response): Promise<void> => {
  const ingredientTypes = await IngredientTypeRepository.getIngredientTypes();
  res.json(ingredientTypes);
};

export const getBySlug = async (req: Request, res: Response): Promise<void> => {
  const { slug } = req.params;
  try {
    const ingredientType =
      await IngredientTypeRepository.getIngredientTypeBySlug(slug);
    res.status(201).json(ingredientType);
  } catch (error) {
    res.status(404).json({ error: getErrorMessage(error) });
  }
};

export const post = async (req: Request, res: Response): Promise<void> => {
  const { type } = req.body;
  if (!type.trim()) {
    res
      .status(400)
      .json({ error: "Le champ 'type d'ingrédient' est obligatoire." });
  } else {
    try {
      const newIngredientType =
        await IngredientTypeRepository.createIngredientType(type);
      res.status(201).json(newIngredientType);
    } catch (error) {
      res.status(404).json({ error: getErrorMessage(error) });
    }
  }
};

export const put = async (req: Request, res: Response): Promise<void> => {
  const { slug } = req.params;
  const { id, type } = req.body;
  try {
    await ingredientTypeValidation(type);
    const updateIngredientType = await IngredientTypeRepository.updateIngredientType(id, type, slug);
    res.status(201).json(updateIngredientType);
  } catch (error) {
    res.status(404).json({ error: getErrorMessage(error) });
  }
};

export const del = async (req: Request, res: Response): Promise<void> => {
  const { slug } = req.params;
  try {
    await IngredientTypeRepository.deleteIngredientType(slug);
    res.json({ message: "Le type d'ingrédient a été supprimé avec succès." });
  } catch (error) {
    res.status(404).json({ error: getErrorMessage(error) });
  }
};
