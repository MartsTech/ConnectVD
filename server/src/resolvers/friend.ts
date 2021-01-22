import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Mutation,
  ObjectType,
  Publisher,
  PubSub,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Friend } from "../entities/Friend";
import { MyContext } from "../types";
import { validateFriendRequest } from "../utils/validateFriendRequest";

@ObjectType()
class RequestResponse {
  @Field()
  message: string;
  @Field()
  status: string;
}

@Resolver(Friend)
export class FriendResolver {
  @FieldResolver()
  user(@Root() friend: Friend, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(friend.friendId);
  }
  @Query(() => [Friend])
  friends(@Ctx() { req }: MyContext): Promise<Friend[]> {
    return Friend.find({
      where: { userId: req.session.userId, status: "accepted" },
    });
  }
  @Query(() => [Friend])
  friendRequests(@Ctx() { req }: MyContext): Promise<Friend[]> {
    return Friend.find({
      where: { userId: req.session.userId, status: "pending" },
    });
  }

  @Subscription(() => Friend, {
    topics: "REQUESTS",
    filter: ({ payload, context }) => {
      return (
        payload.userId === context.connection.context.req &&
        payload.status === "pending"
      );
    },
  })
  newFriendRequst(
    @Root() request: Friend,
    // @ts-ignore
    @Ctx() context: any
  ): Friend {
    return request;
  }

  @Subscription(() => Friend, {
    topics: "FRIENDS",
    filter: ({ payload, context }) => {
      return (
        payload.userId === context.connection.context.req &&
        payload.status === "accepted"
      );
    },
  })
  newFriend(
    @Root() request: Friend,
    // @ts-ignore
    @Ctx() context: any
  ): Friend {
    return request;
  }

  @Mutation(() => RequestResponse)
  async createFriendRequest(
    @Arg("email") email: string,
    @Ctx() { req }: MyContext,
    @PubSub("REQUESTS") notifyAboutNewRequest: Publisher<Friend>
  ): Promise<RequestResponse> {
    const checkCopy = true;
    const friend = await validateFriendRequest(
      req.session.userId,
      email,
      checkCopy
    );
    if (typeof friend === "object") {
      return friend;
    }
    const request = await Friend.create({
      userId: friend,
      friendId: req.session.userId,
    }).save();

    await notifyAboutNewRequest(request);

    return { message: "Friend request successfully sent.", status: "success" };
  }
  @Mutation(() => Friend, { nullable: true })
  async acceptFriendRequest(
    @Arg("email") email: string,
    @Ctx() { req }: MyContext
  ): Promise<Friend | undefined> {
    const request = await validateFriendRequest(req.session.userId, email);
    if (typeof request === "object") {
      return undefined;
    }
    const friend = await getConnection()
      .createQueryBuilder()
      .update(Friend)
      .set({ status: "accepted" })
      .where('"userId" = :id and "friendId" = :request', {
        id: req.session.userId,
        request,
      })
      .returning("*")
      .execute();

    await Friend.create({
      userId: request,
      friendId: req.session.userId,
      status: "accepted",
    }).save();
    return friend.raw[0];
  }
  @Mutation(() => Boolean)
  async declineFriendRequest(
    @Arg("email") email: string,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const request = await validateFriendRequest(req.session.userId, email);
    if (typeof request === "object") {
      return false;
    }
    await Friend.delete({
      userId: req.session.userId,
      friendId: request,
    });
    return true;
  }
}
