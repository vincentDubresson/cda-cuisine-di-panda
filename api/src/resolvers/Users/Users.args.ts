import { Contains, Length } from "class-validator";
import { ArgsType, Field, ID } from "type-graphql";

@ArgsType()
export class UserCreateArgs {
  @Field()
  @Length(1, 255)
  firstname: string;

  @Field()
  @Length(1, 255)
  lastname: string;

  @Field()
  birthdate: Date;

  @Field()
  @Length(1, 255)
  email: string;

  @Field()
  @Length(8, 12)
  plainPassword: string;

  @Field({ nullable: true })
  picture: string;
}

@ArgsType()
export class UserUpdateArgs {
  @Field(() => ID)
  id: string;

  @Field()
  @Length(1, 255)
  firstname: string;

  @Field()
  @Length(1, 255)
  lastname: string;

  @Field()
  birthdate: Date;

  @Field()
  @Length(1, 255)
  email: string;

  @Field({ nullable: true })
  picture: string;

  @Field()
  isOnline: boolean;

  @Field()
  @Contains("ROLE_")
  role: string;
}
