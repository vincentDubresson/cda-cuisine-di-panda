import { isEmpty } from "class-validator";
import { Repository } from "typeorm";
import { getRepository } from "../../database/utils";
import User from "./User.entity";
import { hashPassword } from "./User.services";

export default class UserRepository extends User {
  private static repository: Repository<User>;

  static async initializeRepository() {
    this.repository = await getRepository(User);
  }

  static async clearRepository(): Promise<void> {
    this.repository.clear();
  }

  static async initializeUser(
    users: {
      firstname: string;
      lastname: string;
      birthdate: Date;
      email: string;
      plainPassword: string;
      isOnline: boolean;
      role: string;
    }[]
  ): Promise<void> {
    // Maybe add here some repositories to clear
    await this.repository.clear();
    const createdAt = new Date();
    for (const user of users) {
      const password = hashPassword(user.plainPassword);
      await this.repository.save({
        firstname: user.firstname,
        lastname: user.lastname,
        birthdate: user.birthdate,
        email: user.email,
        password: password,
        createdAt: createdAt,
        isOnline: user.isOnline,
        role: user.role,
      });
    }
  }

  static async getUsers(): Promise<User[]> {
    return this.repository.find();
  }

  static async getUserById(id: string): Promise<User | null> {
    const user = this.repository.findOneBy({ id });

    if (!user) {
      throw Error("Aucun utilisateur de correspond à cet id.");
    }

    return user;
  }

  static async createUser(
    firstname: string,
    lastname: string,
    birthdate: Date,
    email: string,
    plainPassword: string,
    picture: string
  ): Promise<User> {
    if (isEmpty(firstname.trim())) throw Error("Le prénom est obligatoire.");
    if (isEmpty(lastname.trim())) throw Error("Le nom est obligatoire.");
    if (isEmpty(birthdate))
      throw Error("La date de naissance est obligatoire.");
    if (isEmpty(email.trim())) throw Error("L'email est obligatoire.");
    if (isEmpty(plainPassword.trim()))
      throw Error("Merci de rentrer un mot de passe.");
    if (isEmpty(picture) || !picture) picture = "empty.png";
    const password = hashPassword(plainPassword);
    const createdAt = new Date();

    const newUser = new User(
      firstname,
      lastname,
      birthdate,
      email,
      password,
      picture,
      createdAt
    );

    return this.repository.save(newUser);
  }

  static async updateUser(
    id: string,
    firstname: string,
    lastname: string,
    birthdate: Date,
    email: string,
    picture: string,
    isOnline: boolean,
    role: string
  ): Promise<User> {
    if (isEmpty(firstname.trim())) throw Error("Le prénom est obligatoire.");
    if (isEmpty(lastname.trim())) throw Error("Le nom est obligatoire.");
    if (isEmpty(birthdate))
      throw Error("La date de naissance est obligatoire.");
    if (isEmpty(email.trim())) throw Error("L'email est obligatoire.");

    const userToUpdate = await this.getUserById(id);

    if (!userToUpdate) throw Error("Aucun utilisateur ne correspond à cet id.");

    const updatedAt = new Date();

    return await this.repository.save({
      id,
      firstname: firstname,
      lastname: lastname,
      birthdate: birthdate,
      email: email,
      picture: picture,
      updatedAt: updatedAt,
      isOnline: isOnline,
      role: role,
    });
  }

  static async deleteUser(id: string): Promise<User> {
    const user = await this.getUserById(id);

    if (!user) {
      throw Error("Aucun utilisateur de correspond à cet id.");
    }

    await this.repository.remove(user);

    return user;
  }
}
