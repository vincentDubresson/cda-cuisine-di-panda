import { Length } from "class-validator";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class CreateKeywordArgs {
  @Field()
  @Length(1, 255)
  keyword: string;
}
