import { Repository } from "typeorm";
import { getRepository } from "../../database/utils";
import MeasureUnity from "./MeasureUnity.entity";

export default class MeasureUnityRepository extends MeasureUnity {
  private static repository: Repository<MeasureUnity>;

  static async initializeRepository() {
    this.repository = await getRepository(MeasureUnity);
  }

  static async clearRepository(): Promise<void> {
    this.repository.clear();
  }

  static async initializeMeasureUnity(measureUnities: string[]): Promise<void> {
    // Maybe add here some repositories to clear
    await this.repository.clear();

    for (const unity of measureUnities) {
      await this.repository.save({ unity });
    }
  }

  static async getMeasureUnities(): Promise<MeasureUnity[]> {
    return this.repository.find();
  }
}