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
    console.log(newIngredientType);
    await validateOrReject(newIngredientType);
  } catch (errors: any) {
    return errors;
  }
}

export const ingredientTypeValidation = async (type: string) => {
  if (!type.trim()) {
    throw Error("Le champ 'type d'ingrédient' est obligatoire.");
  }
  if (type.length > 255) {
    throw Error("Le type d'ingrédient ne doit pas dépasser 255 caractères.");
  }
}