import { isEmpty } from "class-validator";
import slugify from "slugify";
import { Repository } from "typeorm";
import { getRepository } from "../../database/utils";
import Keyword from "./Keyword.entity";

export default class KeywordRepository extends Keyword {
  private static repository: Repository<Keyword>;

  static async initializeRepository() {
    this.repository = await getRepository(Keyword);
  }

  static async clearRepository(): Promise<void> {
    this.repository.clear();
  }

  static async initializeKeyword(
    keywords: { keyword: string; slug: string }[]
  ): Promise<void> {
    // Maybe add here some repositories to clear
    await this.repository.clear();
    for (const keyword of keywords) {
      await this.repository.save({
        keyword: keyword.keyword,
        slug: keyword.slug,
      });
    }
  }

  static async getKeywords(): Promise<Keyword[]> {
    return this.repository.find();
  }

  static async getKeywordById(id: number): Promise<Keyword> {
    const keyword = await this.repository.findOneBy({ id });

    if (!keyword) {
      throw Error("Aucun mot clé ne correspond à cet id.");
    }

    return keyword;
  }

  static async getKeywordByName(name: string): Promise<Keyword> {
    const keyword = await this.repository.findOneBy({ keyword: name });

    if (!keyword) {
      throw Error("Aucun mot clé trouvé");
    }

    return keyword;
  }

  static async createKeyword(keyword: string): Promise<Keyword> {
    if (isEmpty(keyword.trim()))
      throw Error("Le champ `mot clé` est obligatoire.");

    const slug = slugify(keyword, { lower: true });
    const newKeyword = new Keyword(keyword, slug);

    return await this.repository.save(newKeyword);
  }

  static async deleteKeyword(id: number): Promise<Keyword> {
    const keywordToDelete = await this.getKeywordById(id);

    if (!keywordToDelete) throw Error("Aucun mot clé ne correspond à cet ID.");

    await this.repository.remove(keywordToDelete);

    return keywordToDelete;
  }
}
