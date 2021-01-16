import { User } from "../entities/User";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  users(): Promise<User[]> {
    return User.find({});
  }
  @Mutation(() => Boolean)
  async register(@Arg("id") id: string): Promise<Boolean> {
    const user = await User.findOne({ id });
    if (user) {
      return false;
    }
    await User.create({ id }).save();
    return true;
  }
}
