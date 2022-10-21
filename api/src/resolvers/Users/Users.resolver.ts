import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import User from "../../models/Users/User.entity";
import UserRepository from "../../models/Users/User.repository";
import { UserCreateArgs, UserUpdateArgs } from "./Users.args";

@Resolver(User)
export default class UserResolver {
  @Query(() => [User])
  users(): Promise<User[]> {
    return UserRepository.getUsers();
  }

  @Query(() => User)
  user(@Arg("id") id: string): Promise<User | null> {
    return UserRepository.getUserById(id);
  }

  @Mutation(() => User)
  createUser(
    @Args()
    {
      firstname,
      lastname,
      birthdate,
      email,
      plainPassword,
      picture,
    }: UserCreateArgs
  ): Promise<User> {
    return UserRepository.createUser(
      firstname,
      lastname,
      birthdate,
      email,
      plainPassword,
      picture
    );
  }

  @Mutation(() => User)
  updateUser(
    @Args()
    {
      id,
      firstname,
      lastname,
      birthdate,
      email,
      picture,
      isOnline,
      role,
    }: UserUpdateArgs
  ): Promise<User> {
    return UserRepository.updateUser(
      id,
      firstname,
      lastname,
      birthdate,
      email,
      picture,
      isOnline,
      role
    );
  }

  @Mutation(() => User)
  deleteUser(@Arg("id") id: string): Promise<User> {
    return UserRepository.deleteUser(id);
  }
}
