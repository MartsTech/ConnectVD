import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { getConnection } from "typeorm";
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
    const exists = await User.findOne({ where: { id: options.id } });
    if (!exists) {
      req.session.userId = options.id;
      return User.create({ ...options }).save();
    }
    req.session.userId = options.id;
    return exists;
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
  @Mutation(() => User, { nullable: true })
  async changeStatus(
    @Arg("status") status: string,
    @Ctx() { req }: MyContext
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
      .where("id = :id", { id: req.session.userId })
      .returning("*")
      .execute();
    return user.raw[0];
  }
}
