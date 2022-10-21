import { Repository } from "typeorm";
import { getRepository } from "../../database/utils";
import Rate from "./Rate.entity";

export default class RateRepository extends Rate {
  private static repository: Repository<Rate>;

  static async initializeRepository() {
    this.repository = await getRepository(Rate);
  }

  static async clearRepository(): Promise<void> {
    this.repository.clear();
  }

  static async initializeRate(rates: number[]): Promise<void> {
    // Maybe add here some repositories to clear
    await this.repository.clear();

    for (const rate of rates) {
      await this.repository.save({ rate });
    }
  }

  static async getRates(): Promise<Rate[]> {
    return this.repository.find();
  }
}