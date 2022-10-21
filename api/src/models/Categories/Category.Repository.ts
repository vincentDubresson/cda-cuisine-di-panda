import { isEmpty } from "class-validator";
import slugify from "slugify";
import { Repository } from "typeorm";
import { getRepository } from "../../database/utils";
import Category from "./Category.entity";

export default class CategoryRepository extends Category {
  private static repository: Repository<Category>

  static async initializeRepository() {
    this.repository = await getRepository(Category);
  }

  static async clearRepository(): Promise<void> {
    this.repository.clear();
  }

  static async initializeCategory(categories: {name: string, slug: string}[]): Promise<void> {
    // Maybe add here some repositories to clear
    await this.repository.clear();
    for (const category of categories) {
      await this.repository.save({
        name: category.name,
        slug: category.slug,
      });
    }
  }

  static async getCategories(): Promise<Category[]> {
    return this.repository.find();
  }

  static async getCategoryById(id: number): Promise<Category> {
    const category = await this.repository.findOneBy({ id });

    if (!category) {
      throw Error("Aucune catégorie ne correspond à cet id.");
    }

    return category;
  }

  static async getCategoryByName(
    name: string
  ): Promise<Category | null> {
    const category = await this.repository.findOneBy({ name });

    if (!category) {
      throw Error("Aucune catégorie ne correspond à cet id.");
    }
    return category;
  }

  static async getCategoryBySlug(slug: string): Promise<Category> {
    const category = await this.repository.findOneBy({ slug });

    if (!category) {
      throw Error("Catégorie non trouvée.");
    }

    return category;
  }

  static async createCategory(name: string): Promise<Category> {
    if (isEmpty(name.trim()))
      throw Error("Le champ `catégorie` est obligatoire.");

    const slug = slugify(name, { lower: true });
    const newCategory = new Category(name, slug);

    return await this.repository.save(newCategory);
  }

  static async updateCategory(
    id: number,
    name: string
  ): Promise<Category> {
    if (isEmpty(name.trim()))
      throw Error("Le champ `catégorie` est obligatoire.");

    const category = await this.getCategoryById(id);

    if (!category)
      throw Error("Aucune catégorie ne correspond à cet ID.");

    const newSlug = slugify(name, { lower: true });

    return await this.repository.save({ id, name, slug: newSlug });
  }

  static async deleteCategory(id: number): Promise<Category> {
    const category = await this.getCategoryById(id);

    if (!category)
      throw Error("Aucun type d'ingrédient ne correspond à cet ID.");

    return await this.repository.remove(category);
  }
}