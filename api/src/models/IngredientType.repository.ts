import { Repository } from "typeorm";
import { getRepository } from "../database/utils";
import IngredientType from "./IngredientType.entity";

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

  static async getIngredientTypeByName(name: string): Promise<IngredientType | null> {
    return await this.repository.findOneBy({type: name})
  }
}