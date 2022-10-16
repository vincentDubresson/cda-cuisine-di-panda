import { Repository } from "typeorm";
import { getRepository } from "../../database/utils";
import Keyword from "./Keyword.entity";

export default class KeywordRepository extends Keyword {
  private static repository: Repository<Keyword>

  static async initializeRepository() {
    this.repository = await getRepository(Keyword);
  }

  static async clearRepository(): Promise<void> {
    this.repository.clear();
  }

  static async initializeKeyword(keywords: string[]): Promise<void> {
    // Maybe add here some repositories to clear
    await this.repository.clear();
    for (const keyword of keywords) {
      await this.repository.save({ keyword: keyword });
    }
  }
}