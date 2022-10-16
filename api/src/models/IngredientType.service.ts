import { validateOrReject } from "class-validator";
import IngredientType from "./IngredientType.entity";

export const ingredientTypes: string[] = [
  "Apéritifs",
  "Entrées",
  "Plats",
  "Desserts",
  "Boissons"
];

export const validateOrRejectIngredientTypeCreation = async (newIngredientType: IngredientType) => {
  try {
    await validateOrReject(newIngredientType);
  } catch (errors: any) {
    return errors;
  }
}