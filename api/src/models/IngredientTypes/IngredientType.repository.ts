import { Repository } from "typeorm";
import { isEmpty } from "class-validator";
import slugify from "slugify";

import IngredientType from "./IngredientType.entity";
import { getRepository } from "../../database/utils";

export default class IngredientTypeRepository extends IngredientType {
  private static repository: Repository<IngredientType>;

  static async initializeRepository() {
    this.repository = await getRepository(IngredientType);
  }

  static async clearRepository(): Promise<void> {
    this.repository.clear();
  }

  static async initializeIngredientType(
    ingredientTypes: { type: string; slug: string }[]
  ): Promise<void> {
    // Maybe add here some repositories to clear
    await this.repository.clear();
    for (const ingredientType of ingredientTypes) {
      await this.repository.save({
        type: ingredientType.type,
        slug: ingredientType.slug,
      });
    }
  }

  static async getIngredientTypes(): Promise<IngredientType[]> {
    return this.repository.find();
  }

  static async getIngredientTypeById(id: number): Promise<IngredientType> {
    const ingredientType = await this.repository.findOneBy({ id });

    if (!ingredientType) {
      throw Error("Aucun type d'ingrédient ne correspond à cet id.");
    }

    return ingredientType;
  }

  static async getIngredientTypeByName(
    name: string
  ): Promise<IngredientType | null> {
    const ingredientType = await this.repository.findOneBy({ type: name });

    if (!ingredientType) {
      throw Error("Aucun type d'ingrédient ne correspond à cet id.");
    }
    return ingredientType;
  }

  static async getIngredientTypeBySlug(slug: string): Promise<IngredientType> {
    const ingredientType = await this.repository.findOneBy({ slug });

    if (!ingredientType) {
      throw Error("Type d'ingrédient non trouvé.");
    }

    return ingredientType;
  }

  static async createIngredientType(type: string): Promise<IngredientType> {
    if (isEmpty(type.trim()))
      throw Error("Le champ `type d'ingrédient` est obligatoire.");

    const slug = slugify(type, { lower: true });
    const newIngredientType = new IngredientType(type, slug);

    return await this.repository.save(newIngredientType);
  }

  static async updateIngredientType(
    id: number,
    type: string
  ): Promise<IngredientType> {
    if (isEmpty(type.trim()))
      throw Error("Le champ `type d'ingrédient` est obligatoire.");

    const ingredientType = await this.getIngredientTypeById(id);

    if (!ingredientType)
      throw Error("Aucun type d'ingrédient ne correspond à cet ID.");

    const newSlug = slugify(type, { lower: true });

    return await this.repository.save({ id, type, slug: newSlug });
  }

  static async deleteIngredientType(id: number): Promise<IngredientType> {
    const ingredientType = await this.getIngredientTypeById(id);

    if (!ingredientType)
      throw Error("Aucun type d'ingrédient ne correspond à cet ID.");

    return await this.repository.remove(ingredientType);
  }
}
