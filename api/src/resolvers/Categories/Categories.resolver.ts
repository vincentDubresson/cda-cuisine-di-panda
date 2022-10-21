import { Resolver, Query, Arg, Mutation, Args } from "type-graphql";

import Category from "../../models/Categories/Category.entity";
import CategoryRepository from "../../models/Categories/Category.Repository";
import {
  CreateCategoryArgs,
  UpdateCategoryArgs,
} from "./Categories.args";

@Resolver(Category)
export default class CategoryResolver {
  @Query(() => [Category])
  categories(): Promise<Category[]> {
    return CategoryRepository.getCategories();
  }

  @Query(() => Category)
  category(@Arg("id") id: number): Promise<Category> {
    return CategoryRepository.getCategoryById(id);
  }

  @Query(() => Category)
  categoryBySlug(@Arg("slug") slug: string): Promise<Category> {
    return CategoryRepository.getCategoryBySlug(slug);
  }

  @Mutation(() => Category)
  createCategory(
    @Args() { name }: CreateCategoryArgs
  ): Promise<Category> {
    return CategoryRepository.createCategory(name);
  }

  @Mutation(() => Category)
  updateCategory(
    @Args() { id, name }: UpdateCategoryArgs
  ): Promise<Category> {
    return CategoryRepository.updateCategory(id, name);
  }

  @Mutation(() => Category)
  deleteCategory(@Arg("id") id: number): Promise<Category> {
    return CategoryRepository.deleteCategory(id);
  }
}
