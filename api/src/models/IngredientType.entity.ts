import { MaxLength } from "class-validator";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class IngredientType {
  constructor(
    type: string,
  ) {
    this.type = type;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index({unique: true})
  @MaxLength(255, {
    message: "Le type d'ingrédient ne doit pas dépasser 255 caractères",
  })
  type: string;
}