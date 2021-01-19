import { User } from "../entities/User";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  users(): Promise<User[]> {
    return User.find({});
  }
  @Mutation(() => Boolean)
  async register(
    @Arg("id") id: string,
    @Arg("email") email: string,
    @Arg("displayName") displayName: string,
    @Arg("photoUrl", () => String, { nullable: true })
    photoUrl: string | undefined
  ): Promise<Boolean> {
    const user = await User.findOne({ id });
    if (user) {
      return false;
    }
    await User.create({ id, email, displayName, photoUrl }).save();
    return true;
  }
  @Query(() => User, { nullable: true })
  me(@Arg("id") id: string): Promise<User | undefined> {
    return User.findOne(id);
  }
  @Mutation(() => User, { nullable: true })
  async changeStatus(
    @Arg("id") id: string,
    @Arg("status") status: string
  ): Promise<User | undefined> {
    const options = ["available", "away", "busy"];
    if (!options.includes(status)) {
      return;
    }
    const user = await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({ status })
      .where("id = :id", { id })
      .returning("*")
      .execute();
    return user.raw[0];
  }
}
