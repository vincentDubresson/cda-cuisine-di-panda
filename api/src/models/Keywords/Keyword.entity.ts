import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export default class Keyword {
  constructor(keyword: string, slug: string) {
    this.keyword = keyword;
    this.slug = slug;
  }

  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column()
  @Index({ unique: true })
  @Field()
  keyword: string;

  @Column()
  @Index({ unique: true })
  @Field()
  slug: string;
}
