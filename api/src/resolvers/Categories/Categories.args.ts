import { ArgsType, Field } from "type-graphql";
import { Length } from "class-validator";

@ArgsType()
export class CreateCategoryArgs {
  @Field()
  @Length(1, 255)
  name: string;
}

@ArgsType()
export class UpdateCategoryArgs extends CreateCategoryArgs {
  @Field()
  id: number;
}
