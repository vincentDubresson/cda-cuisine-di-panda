import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export default class User {
  constructor(
    firstname: string,
    lastname: string,
    birthdate: Date,
    email: string,
    password: string,
    picture: string,
    createdAt: Date,
    isOnline?: boolean,
    role?: string,
    updatedAt?: Date
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.birthdate = birthdate;
    this.email = email;
    this.password = password;
    this.picture = picture;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isOnline = isOnline;
    this.role = role;
  }

  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  firstname: string;

  @Column()
  @Field()
  lastname: string;

  @Column()
  @Field()
  birthdate: Date;

  @Column()
  @Index({ unique: true })
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Column({ nullable: true, default: "empty.png" })
  @Field()
  picture: string;

  @Column()
  @Field()
  createdAt: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  updatedAt?: Date;

  @Column({ default: false })
  @Field()
  isOnline?: boolean;

  @Column({ default: "ROLE_USER" })
  @Field()
  role?: string;
}
