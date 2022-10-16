import { Repository } from "typeorm";
import { getRepository } from "../database/utils";
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

  static async initializeIngredientType(ingredientTypes: string[]): Promise<void> {
    // Maybe add here some repositories to clear
    await this.repository.clear();
    for (const ingredientType of ingredientTypes) {
      await this.repository.save({type: ingredientType})
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

  static async getIngredientTypeByName(name: string): Promise<IngredientType | null> {
    return await this.repository.findOneBy({type: name})
  }

  static async createIngredientType(type: string): Promise<IngredientType> {
    const newIngredientType = new IngredientType(type);
    const errors = await validateOrRejectIngredientTypeCreation(newIngredientType);
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

  static async updateIngredientType(id: string, type: string): Promise<IngredientType> {
    try {
      await this.getIngredientTypesById(id);
    } catch (error: any) {
      throw Error(error);
    }
    const updateIngredientType = await this.repository.save({id, type});
    return updateIngredientType;
  }

  static async deleteIngredientType(id: string): Promise<IngredientType> {
    try {
      const IngredientTypeToDelete = await this.getIngredientTypesById(id);
      return await this.repository.remove(IngredientTypeToDelete);
    } catch (error: any) {
      throw Error(error);
    }
  }
}