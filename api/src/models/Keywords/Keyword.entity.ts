import { MaxLength } from "class-validator";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Keyword {
  constructor(keyword: string, slug: string) {
    this.keyword = keyword;
    this.slug = slug;
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Index({ unique: true })
  @MaxLength(255, {
    message: "un mot clé ne peut pas dépasser 255 caractères",
  })
  keyword: string;

  @Column()
  @Index({ unique: true })
  slug: string;
}
