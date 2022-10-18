import { ObjectType, Field, ID } from "type-graphql";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export default class IngredientType {
  constructor(type: string, slug: string) {
    this.type = type;
    this.slug = slug;
  }

  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column()
  @Index({ unique: true })
  @Field()
  type: string;

  @Column()
  @Index({ unique: true })
  @Field()
  slug: string;
}
