import { Resolver, Query, Arg, Mutation, Args } from "type-graphql";

import IngredientType from "../../models/IngredientTypes/IngredientType.entity";
import IngredientTypeRepository from "../../models/IngredientTypes/IngredientType.repository";
import {
  CreateIngredientTypeArgs,
  UpdateIngredientTypeArgs,
} from "./IngredientTypes.args";

@Resolver(IngredientType)
export default class IngredientTypeResolver {
  @Query(() => [IngredientType])
  ingredientTypes(): Promise<IngredientType[]> {
    return IngredientTypeRepository.getIngredientTypes();
  }

  @Query(() => IngredientType)
  ingredientType(@Arg("id") id: number): Promise<IngredientType> {
    return IngredientTypeRepository.getIngredientTypeById(id);
  }

  @Query(() => IngredientType)
  ingredientTypeBySlug(@Arg("slug") slug: string): Promise<IngredientType> {
    return IngredientTypeRepository.getIngredientTypeBySlug(slug);
  }

  @Mutation(() => IngredientType)
  createIngredientType(
    @Args() { type }: CreateIngredientTypeArgs
  ): Promise<IngredientType> {
    return IngredientTypeRepository.createIngredientType(type);
  }

  @Mutation(() => IngredientType)
  updateIngredientType(
    @Args() { id, type }: UpdateIngredientTypeArgs
  ): Promise<IngredientType> {
    return IngredientTypeRepository.updateIngredientType(id, type);
  }

  @Mutation(() => IngredientType)
  deleteIngredientType(@Arg("id") id: number): Promise<IngredientType> {
    return IngredientTypeRepository.deleteIngredientType(id);
  }
}
