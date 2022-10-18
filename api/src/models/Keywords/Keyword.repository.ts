import slugify from "slugify";
import { Repository } from "typeorm";
import { getRepository } from "../../database/utils";
import Keyword from "./Keyword.entity";
import { validateOrRejectIngredientTypeCreation } from "./Keyword.service";

export default class KeywordRepository extends Keyword {
  private static repository: Repository<Keyword>

  static async initializeRepository() {
    this.repository = await getRepository(Keyword);
  }

  static async clearRepository(): Promise<void> {
    this.repository.clear();
  }

  static async initializeKeyword(keywords: {keyword: string, slug: string}[]): Promise<void> {
    // Maybe add here some repositories to clear
    await this.repository.clear();
    for (const keyword of keywords) {
      await this.repository.save({ keyword: keyword.keyword, slug: keyword.slug });
    }
  }

  static async getKeywords(): Promise<Keyword[]> {
    return this.repository.find();
  }

  static async getKeywordById(id: string): Promise<Keyword> {
    const keyword = await this.repository.findOneBy({ id });
    if (!keyword) {
      throw Error("Aucun mot clé ne correspond à cet id.");
    }
    return keyword;
  }

  static async getKeywordByName(
    name: string
  ): Promise<Keyword | null> {
    return await this.repository.findOneBy({ keyword: name });
  }

  static async getKeywordBySlug(
    slug: string
  ): Promise<Keyword | null> {
    const keyword = await this.repository.findOneBy({ slug: slug });
    if (!keyword) {
      throw Error("Mot clé non trouvé.");
    }
    return keyword;
  }

  static async createKeyword(keyword: string): Promise<Keyword> {
    const slug = slugify(keyword, {lower: true});
    const newKeyword = new Keyword(keyword, slug);
    const errors = await validateOrRejectIngredientTypeCreation(
      newKeyword
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
      await this.repository.save(newKeyword);
      return newKeyword;
    }
  }

  static async updateIngredientType(
    id: string,
    keyword: string,
    slug: string,
  ): Promise<Keyword> {
    const newSlug = slugify(keyword, {lower: true});
    try {
      await this.getKeywordById(id);
      const updateKeyword = await this.repository.save({ id, keyword, slug: newSlug });
      return updateKeyword;
    } catch (error: any) {
      throw Error(error);
    }
  }

  static async deleteKeyword(slug: string): Promise<Keyword> {
    try {
      const keywordToDelete = await this.getKeywordBySlug(slug) as Keyword;
      return await this.repository.remove(keywordToDelete);
    } catch (error: any) {
      throw Error(error);
    }
  }
}
