import { Friend } from "../entities/Friend";
import {
  Mutation,
  Arg,
  Resolver,
  Query,
  InputType,
  Field,
  FieldResolver,
  Root,
  Ctx,
} from "type-graphql";
import { getConnection } from "typeorm";
import { validateFriendRequest } from "../utils/validateFriendRequest";
import { MyContext } from "src/types";

@InputType()
class FriendRequestInput {
  @Field()
  id: string;
  @Field()
  email: string;
}

@Resolver(Friend)
export class FriendResolver {
  @FieldResolver()
  user(@Root() friend: Friend, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(friend.friendId);
  }
  @Query(() => [Friend])
  friends(@Arg("id") id: string): Promise<Friend[]> {
    return Friend.find({ where: { userId: id, status: "accepted" } });
  }
  @Query(() => [Friend])
  friendRequests(@Arg("id") id: string): Promise<Friend[]> {
    return Friend.find({ where: { userId: id, status: "pending" } });
  }
  @Mutation(() => Boolean)
  async createFriendRequest(
    @Arg("input") { id, email }: FriendRequestInput
  ): Promise<boolean> {
    const checkCopy = true;
    const friendId = await validateFriendRequest(id, email, checkCopy);
    if (typeof friendId === "undefined") {
      return false;
    }
    await Friend.create({
      userId: friendId,
      friendId: id,
    }).save();
    return true;
  }
  @Mutation(() => Friend, { nullable: true })
  async acceptFriendRequest(
    @Arg("input") { id, email }: FriendRequestInput
  ): Promise<Friend | undefined> {
    const friendId = await validateFriendRequest(id, email);
    if (typeof friendId === "undefined") {
      return undefined;
    }
    const request = await getConnection()
      .createQueryBuilder()
      .update(Friend)
      .set({ status: "accepted" })
      .where('"userId" = :id and "friendId" = :friendId', {
        id,
        friendId,
      })
      .returning("*")
      .execute();

    await Friend.create({
      userId: friendId,
      friendId: id,
      status: "accepted",
    }).save();
    return request.raw[0];
  }
  @Mutation(() => Boolean)
  async declineFriendRequest(
    @Arg("input") { id, email }: FriendRequestInput
  ): Promise<boolean> {
    const friendId = await validateFriendRequest(id, email);
    if (typeof friendId === "undefined") {
      return false;
    }
    await Friend.delete({
      userId: id,
      friendId: friendId,
    });
    return true;
  }
}
