import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export default class Origin {
  constructor(origin: string, slug: string) {
    this.origin = origin;
    this.slug = slug;
  }

  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Index({ unique: true })
  @Field()
  origin: string;

  @Column()
  @Field()
  slug: string;
}
