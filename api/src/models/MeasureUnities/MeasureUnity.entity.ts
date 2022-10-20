import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export default class MeasureUnity {
  constructor(unity: string) {
    this.unity = unity
  }

  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Index({ unique: true })
  @Field()
  unity: string;
}