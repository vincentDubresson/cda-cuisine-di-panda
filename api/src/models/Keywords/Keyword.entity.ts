import { MaxLength } from "class-validator";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Keyword {
  constructor(keyword: string) {
    this.keyword = keyword;
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Index({ unique: true })
  @MaxLength(255, {
    message: "Le mot clé ne doit pas dépasser 255 caractères",
  })
  keyword: string;
}
