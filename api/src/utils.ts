import IngredientTypeRepository from "./models/IngredientType.repository";
import { ingredientTypes } from "./models/IngredientType.fixtures";
import { Application } from "express";

export const PORT: number = 4000;

export const startServer = async (app: Application) => {
  // Put there repositories initialization
  await IngredientTypeRepository.initializeRepository();

  // Put there database tables initialization
  await IngredientTypeRepository.initializeIngredientType(ingredientTypes);

  app.listen(PORT, () => {
    console.log(`Success ! The server is running on port ${PORT}.`);
  });
};

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}
