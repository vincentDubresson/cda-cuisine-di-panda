import { Length } from "class-validator";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class OriginCreateArgs {
  @Field()
  @Length(1, 255)
  origin: string;
}

@ArgsType()
export class OriginUpdateArgs extends OriginCreateArgs {
  @Field()
  id: number;
}
