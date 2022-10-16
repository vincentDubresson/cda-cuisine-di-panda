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
      throw Error("No existing ingredient type matching ID");
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
}