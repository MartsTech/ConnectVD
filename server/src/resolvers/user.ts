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
import { User } from "../entities/User";
import { MyContext } from "../types";

@InputType()
export class RegisterOptionsInput {
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
  @Query(() => [User])
  users(): Promise<User[]> {
    return User.find({});
  }
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext): Promise<User | undefined> {
    if (!req.session.userId) {
      return undefined;
    }
    return User.findOne({ where: { id: req.session.userId } });
  }
  @Mutation(() => Boolean)
  async signIn(
    @Arg("options") options: RegisterOptionsInput,
    @Ctx() { req }: MyContext
  ): Promise<Boolean> {
    const exits = await User.findOne({ where: { id: options.id } });
    if (!exits) {
      await User.create({ ...options }).save();
    }
    req.session.userId = options.id;
    return true;
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
      .set({ status: status as any })
      .where("id = :id", { id: req.session.userId })
      .returning("*")
      .execute();
    return user.raw[0];
  }
}
