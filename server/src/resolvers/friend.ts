import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Publisher,
  PubSub,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Friend } from "../entities/Friend";
import { MyContext, NotifyError, Users } from "../types";
import { validateRequest } from "../utils/validateRequest";
import { RequestResponse } from "./RequestResponse";

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
  friendRequests(@Ctx() { req }: any): Promise<Friend[]> {
    return Friend.find({
      where: { userId: req.session.userId, status: "pending" },
    });
  }

  @Subscription(() => Friend, {
    topics: "FRIEND_REQUESTS",
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
    @Ctx() { req }: MyContext,
    @Arg("email") email: string,
    @PubSub("FRIEND_REQUESTS") notifyAboutNewRequest: Publisher<Friend>
  ): Promise<RequestResponse> {
    const checkCopy = true;
    const request = await validateRequest(req.session.userId, email, checkCopy);
    if ((request as NotifyError).message && (request as NotifyError).status) {
      return request as NotifyError;
    }
    const { sender, receiver } = request as Users;
    const friend = await Friend.create({
      userId: receiver.id,
      friendId: req.session.userId,
      id: sender.email,
    }).save();

    await notifyAboutNewRequest(friend);

    return { message: "Friend request successfully sent.", status: "success" };
  }
  @Mutation(() => Boolean)
  async acceptFriendRequest(
    @Ctx() { req }: MyContext,
    @Arg("email") email: string,
    @PubSub("FRIENDS") notifyAboutNewFriend: Publisher<Friend>
  ): Promise<boolean> {
    const request = await validateRequest(req.session.userId, email);
    if ((request as NotifyError).message && (request as NotifyError).status) {
      return false;
    }
    const { sender: initSender, receiver: initReceiver } = request as Users;

    const sender = await getConnection()
      .createQueryBuilder()
      .update(Friend)
      .set({ status: "accepted" })
      .where('"userId" = :id and "friendId" = :friendId', {
        id: req.session.userId,
        friendId: initReceiver.id,
      })
      .returning("*")
      .execute();

    await notifyAboutNewFriend(sender.raw[0]);

    const receiver = await Friend.create({
      userId: initReceiver.id,
      friendId: req.session.userId,
      id: initSender.email,
      status: "accepted",
    }).save();

    await notifyAboutNewFriend(receiver);

    return true;
  }
  @Mutation(() => Boolean)
  async declineFriendRequest(
    @Arg("email") email: string,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const request = await validateRequest(req.session.userId, email);
    if ((request as NotifyError).message && (request as NotifyError).status) {
      return false;
    }
    const { receiver } = request as Users;
    await Friend.delete({
      userId: req.session.userId,
      friendId: receiver.id,
    });
    return true;
  }
}
