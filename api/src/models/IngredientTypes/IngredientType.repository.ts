import { Repository } from "typeorm";
import slugify from "slugify";
import { getRepository } from "../../database/utils";
import IngredientType from "./IngredientType.entity";
import { validateOrRejectIngredientTypeCreation } from "./IngredientType.service";

export default class IngredientTypeRepository extends IngredientType {
  private static repository: Repository<IngredientType>;

  static async initializeRepository() {
    this.repository = await getRepository(IngredientType);
  }

  static async clearRepository(): Promise<void> {
    this.repository.clear();
  }

  static async initializeIngredientType(
    ingredientTypes: {type: string, slug: string}[]
  ): Promise<void> {
    // Maybe add here some repositories to clear
    await this.repository.clear();
    for (const ingredientType of ingredientTypes) {
      await this.repository.save({ type: ingredientType.type, slug: ingredientType.slug });
    }
  }

  static async getIngredientTypes(): Promise<IngredientType[]> {
    return this.repository.find();
  }

  static async getIngredientTypesById(id: string): Promise<IngredientType> {
    const ingredientType = await this.repository.findOneBy({ id });
    if (!ingredientType) {
      throw Error("Aucun type d'ingrédient ne correspond à cet id.");
    }
    return ingredientType;
  }

  static async getIngredientTypeByName(
    name: string
  ): Promise<IngredientType | null> {
    return await this.repository.findOneBy({ type: name });
  }

  static async getIngredientTypeBySlug(
    slug: string
  ): Promise<IngredientType | null> {
    const ingredientType = await this.repository.findOneBy({ slug: slug });
    if (!ingredientType) {
      throw Error("Type d'ingrédient non trouvé.");
    }
    return ingredientType;
  }

  static async createIngredientType(type: string): Promise<IngredientType> {
    const slug = slugify(type, {lower: true});
    const newIngredientType = new IngredientType(type, slug);
    const errors = await validateOrRejectIngredientTypeCreation(
      newIngredientType
    );
    let validationError: string = "";
    if (errors) {
      for (const error of errors) {
        for (const constraint of Object.values(error.constraints)) {
          validationError += ` - ${constraint} - `;
        }
      }
      throw Error(validationError);
    } else {
      await this.repository.save(newIngredientType);
      return newIngredientType;
    }
  }

  static async updateIngredientType(
    id: string,
    type: string,
    slug: string,
  ): Promise<IngredientType> {
    const newSlug = slugify(type, {lower: true});
    try {
      await this.getIngredientTypesById(id);
      const updateIngredientType = await this.repository.save({ id, type, slug: newSlug });
      return updateIngredientType;
    } catch (error: any) {
      throw Error(error);
    }
  }

  static async deleteIngredientType(slug: string): Promise<IngredientType> {
    try {
      const IngredientTypeToDelete = await this.getIngredientTypeBySlug(slug) as IngredientType;
      return await this.repository.remove(IngredientTypeToDelete);
    } catch (error: any) {
      throw Error(error);
    }
  }
}
