import { Field, ObjectType } from "type-graphql";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export default class Category {
  constructor(name: string, slug: string) {
    this.name = name;
    this.slug = slug;
  }

  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Index({unique: true})
  @Field()
  name: string;

  @Column()
  @Index({unique: true})
  @Field()
  slug: string;
}