import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export default class Keyword {
  constructor(keyword: string, slug: string) {
    this.keyword = keyword;
    this.slug = slug;
  }

  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Index({ unique: true })
  @Field()
  keyword: string;

  @Column()
  @Index({ unique: true })
  @Field()
  slug: string;
}
