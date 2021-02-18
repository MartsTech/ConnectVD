import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { User } from "../entities/User";
@InputType()
export class SignInOptionsInput {
  @Field()
  id: string;
  @Field()
  email: string;
  @Field()
  displayName: string;
  @Field(() => String, { nullable: true })
  photoUrl?: string;
}
@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Arg("uid") uid: string): Promise<User | undefined> {
    if (!uid) {
      return undefined;
    }
    return User.findOne({ where: { id: uid } });
  }
  @Mutation(() => User)
  async signIn(@Arg("options") options: SignInOptionsInput): Promise<User> {
    const exists = await User.findOne({ where: { id: options.id } });
    if (!exists) {
      return User.create({ ...options }).save();
    }
    return exists;
  }
  @Mutation(() => User, { nullable: true })
  async changeStatus(
    @Arg("uid") uid: string,
    @Arg("status") status: string
  ): Promise<User | undefined> {
    const options = ["available", "away", "busy"];
    if (!options.includes(status)) {
      return undefined;
    }
    const user = await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({
        status: status as any,
      })
      .where("id = :id", { id: uid })
      .returning("*")
      .execute();
    return user.raw[0];
  }
}
