import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { COOKIE_NAME } from "../constants";
import { User } from "../entities/User";
import { MyContext } from "../types";

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
  async me(@Ctx() { req }: MyContext): Promise<User | undefined> {
    if (!req.session.userId) {
      return undefined;
    }
    return User.findOne({ where: { id: req.session.userId } });
  }
  @Mutation(() => User)
  async signIn(
    @Arg("options") options: SignInOptionsInput,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    const exits = await User.findOne({ where: { id: options.id } });
    if (!exits) {
      const user = await User.create({ ...options }).save();
      req.session.userId = options.id;
      return user;
    }
    req.session.userId = options.id;
    return exits;
  }
  @Mutation(() => Boolean)
  async signOut(@Ctx() { req, res }: MyContext): Promise<Boolean> {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          return resolve(false);
        }
        return resolve(true);
      });
    });
  }
  @Mutation(() => String)
  async changeStatus(
    @Arg("status") status: string,
    @Ctx() { req }: MyContext
  ): Promise<string> {
    const options = ["available", "away", "busy"];
    if (!options.includes(status)) {
      throw new Error("invalid status");
    }
    await User.update({ id: req.session.userId }, { status: status as any });
    return status;
  }
}
