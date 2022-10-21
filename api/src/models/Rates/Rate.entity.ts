import { Field, ObjectType } from "type-graphql";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export default class Rate {
  constructor(rate: number) {
    this.rate = rate
  }

  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Index({ unique: true })
  @Field()
  rate: number;
}