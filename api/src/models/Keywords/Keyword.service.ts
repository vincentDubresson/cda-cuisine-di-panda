import { validateOrReject } from "class-validator";
import Keyword from "./Keyword.entity";

export const validateOrRejectIngredientTypeCreation = async (
  keyword: Keyword
) => {
  try {
    console.log(keyword);
    await validateOrReject(keyword);
  } catch (errors: any) {
    return errors;
  }
};

export const ingredientTypeValidation = async (keyword: string) => {
  if (!keyword.trim()) {
    throw Error("Le champ 'mot clé' ne peut pas être vide.");
  }
  if (keyword.length > 255) {
    throw Error("un mot clé ne peut pas dépasser 255 caractères");
  }
};