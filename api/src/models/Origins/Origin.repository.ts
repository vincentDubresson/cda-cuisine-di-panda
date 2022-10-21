import { isEmpty } from "class-validator";
import slugify from "slugify";
import { Repository } from "typeorm";
import { getRepository } from "../../database/utils";
import Origin from "./Origin.entity";

export default class OriginRepository extends Origin {
  private static repository: Repository<Origin>;

  static async initializeRepository() {
    this.repository = await getRepository(Origin);
  }

  static async clearRepository(): Promise<void> {
    this.repository.clear();
  }

  static async initializeOrigin(origins: { origin: string; slug: string }[]) {
    // Maybe add here some repositories to clear
    await this.repository.clear();
    for (const origin of origins) {
      await this.repository.save({
        origin: origin.origin,
        slug: origin.slug,
      });
    }
  }

  static async getOrigins(): Promise<Origin[]> {
    return this.repository.find();
  }

  static async getOriginById(id: number): Promise<Origin | null> {
    const origin = this.repository.findOneBy({ id });

    if (!origin) {
      throw Error("Aucune origine de plat de correspond à cet id.");
    }

    return origin;
  }

  static async getOriginBySlug(slug: string): Promise<Origin | null> {
    const origin = this.repository.findOneBy({ slug });

    if (!origin) {
      throw Error("Aucune origine de plat de correspond à cet id.");
    }

    return origin;
  }

  static async createOrigin(origin: string): Promise<Origin> {
    if (isEmpty(origin.trim()))
      throw Error("Le champ 'origine' est obligatoire.");

    const slug = slugify(origin);
    const newOrigin = new Origin(origin, slug);

    return await this.repository.save(newOrigin);
  }

  static async updateOrigin(id: number, origin: string): Promise<Origin> {
    if (isEmpty(origin.trim()))
      throw Error("Le champ 'origine' est obligatoire.");

    const originToUpdate = await this.getOriginById(id);

    if (!originToUpdate)
      throw Error("Aucune origine de plat de correspond à cet id.");

    const slug = slugify(origin);

    return await this.repository.save({ id, origin: origin, slug: slug });
  }

  static async deleteOrigin(id: number): Promise<Origin> {
    const origin = await this.getOriginById(id);

    if (!origin) throw Error("Aucune origine de plat de correspond à cet id.");

    await this.repository.remove(origin);

    return origin;
  }
}
