import { ArgsType, Field, ID } from "type-graphql";
import { Length } from "class-validator";

@ArgsType()
export class CreateIngredientTypeArgs {
  @Field()
  @Length(1, 255)
  type: string;
}

@ArgsType()
export class UpdateIngredientTypeArgs extends CreateIngredientTypeArgs {
  @Field()
  id: number;
}
