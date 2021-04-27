import { User } from "../entities/User";
import {
  Arg,
  Args,
  ArgsType,
  Ctx,
  Field,
  FieldResolver,
  Mutation,
  ObjectType,
  Publisher,
  PubSub,
  Query,
  Resolver,
  ResolverFilterData,
  Root,
  Subscription,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Friend } from "../entities/Friend";
import { MyContext, NotifyError, Users } from "../types";
import { validateRequest } from "../utils/validateRequest";
import { RequestResponse } from "./RequestResponse";

@ArgsType()
class FriendSubArgs {
  @Field()
  uid: string;
}

@ObjectType()
class InviteResponse {
  @Field(() => RequestResponse, { nullable: true })
  error?: RequestResponse;
  @Field(() => String, { nullable: true })
  roomId?: string;
}

@Resolver(Friend)
export class FriendResolver {
  @FieldResolver()
  user(@Root() friend: Friend, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(friend.friendId);
  }

  @Query(() => [Friend])
  friends(@Arg("uid") uid: string): Promise<Friend[]> {
    return Friend.find({
      where: { userId: uid, status: "accepted" },
    });
  }
  @Query(() => [Friend])
  friendRequests(@Arg("uid") uid: string): Promise<Friend[]> {
    return Friend.find({
      where: { userId: uid, status: "pending" },
    });
  }
  @Query(() => [Friend])
  invites(@Arg("uid") uid: string): Promise<Friend[]> {
    return Friend.find({
      where: { userId: uid, status: "invite" },
    });
  }

  @Subscription(() => Friend, {
    topics: "FRIEND_REQUESTS",
    filter: ({ payload, args }: ResolverFilterData<Friend, FriendSubArgs>) => {
      return payload.userId === args.uid && payload.status !== "accepted";
    },
  })
  newFriendRequst(
    @Root() request: Friend,
    // @ts-ignore
    @Args() { uid }: FriendSubArgs
  ): Friend {
    return request;
  }

  @Subscription(() => Friend, {
    topics: "FRIENDS",
    filter: ({ payload, args }: ResolverFilterData<Friend, FriendSubArgs>) => {
      return payload.userId === args.uid && payload.status === "accepted";
    },
  })
  newFriend(
    @Root() request: Friend,
    // @ts-ignore
    @Args() { uid }: FriendSubArgs
  ): Friend {
    return request;
  }

  @Subscription(() => Friend, {
    topics: "INVITES",
    filter: ({ payload, args }: ResolverFilterData<Friend, FriendSubArgs>) => {
      return payload.userId === args.uid && payload.status === "invite";
    },
  })
  newInvite(
    @Root() request: Friend,
    // @ts-ignore
    @Args() { uid }: FriendSubArgs
  ): Friend {
    return request;
  }

  @Mutation(() => RequestResponse)
  async createFriendRequest(
    @Arg("uid") uid: string,
    @Arg("email") email: string,
    @PubSub("FRIEND_REQUESTS") notifyAboutNewRequest: Publisher<Friend>
  ): Promise<RequestResponse> {
    const checkCopy = true;
    const request = await validateRequest(uid, email, checkCopy);
    if ((request as NotifyError).message && (request as NotifyError).status) {
      return request as NotifyError;
    }
    const { sender, receiver } = request as Users;
    const friend = await Friend.create({
      userId: receiver.id,
      friendId: uid,
      id: sender.email,
    }).save();

    await notifyAboutNewRequest(friend);

    return { message: "Friend request successfully sent.", status: "success" };
  }
  @Mutation(() => Boolean)
  async acceptFriendRequest(
    @Arg("uid") uid: string,
    @Arg("email") email: string,
    @PubSub("FRIENDS") notifyAboutNewFriend: Publisher<Friend>
  ): Promise<boolean> {
    const request = await validateRequest(uid, email);
    if ((request as NotifyError).message && (request as NotifyError).status) {
      return false;
    }
    const { sender: initSender, receiver: initReceiver } = request as Users;

    const sender = await getConnection()
      .createQueryBuilder()
      .update(Friend)
      .set({ status: "accepted" })
      .where('"userId" = :id and "friendId" = :friendId', {
        id: uid,
        friendId: initReceiver.id,
      })
      .returning("*")
      .execute();

    await notifyAboutNewFriend(sender.raw[0]);

    const receiver = await Friend.create({
      userId: initReceiver.id,
      friendId: uid,
      id: initSender.email,
      status: "accepted",
    }).save();

    await notifyAboutNewFriend(receiver);

    return true;
  }
  @Mutation(() => Boolean)
  async declineFriendRequest(
    @Arg("uid") uid: string,
    @Arg("email") email: string
  ): Promise<boolean> {
    const request = await validateRequest(uid, email);
    if ((request as NotifyError).message && (request as NotifyError).status) {
      return false;
    }
    const { receiver } = request as Users;
    await Friend.delete({
      userId: uid,
      friendId: receiver.id,
      status: "pending",
    });
    return true;
  }
  @Mutation(() => RequestResponse)
  async inviteFriend(
    @Arg("uid") uid: string,
    @Arg("email") email: string,
    @PubSub("INVITES") notifyAboutNewInvite: Publisher<Friend>
  ): Promise<RequestResponse> {
    const request = await validateRequest(uid, email);
    if ((request as NotifyError).message && (request as NotifyError).status) {
      return request as NotifyError;
    }
    const { sender, receiver } = request as Users;
    const exists = await Friend.findOne({
      userId: receiver.id,
      friendId: uid,
      id: sender.email,
      status: "invite",
    });
    if (exists) {
      return { message: "You have already sent an invite.", status: "warning" };
    }
    const invite = await Friend.create({
      userId: receiver.id,
      friendId: uid,
      id: sender.email,
      status: "invite",
    }).save();

    await notifyAboutNewInvite(invite);

    return { message: "Invite successfully sent.", status: "success" };
  }
  @Mutation(() => InviteResponse)
  async acceptInvite(
    @Arg("uid") uid: string,
    @Arg("email") email: string
  ): Promise<InviteResponse> {
    const request = await validateRequest(uid, email);
    if ((request as NotifyError).message && (request as NotifyError).status) {
      return { error: request as NotifyError };
    }
    const { receiver } = request as Users;
    await Friend.delete({
      userId: uid,
      friendId: receiver.id,
      status: "invite",
    });
    const inviter = await User.findOne({ where: { id: receiver.id } });
    const roomId = inviter?.roomId;
    if (roomId === "") {
      return {
        error: {
          message: "Your inviter is no longer in a meeting.",
          status: "error",
        },
      };
    }
    return { roomId };
  }
  @Mutation(() => Boolean)
  async declineInvite(
    @Arg("uid") uid: string,
    @Arg("email") email: string
  ): Promise<boolean> {
    const request = await validateRequest(uid, email);
    if ((request as NotifyError).message && (request as NotifyError).status) {
      return false;
    }
    const { receiver } = request as Users;
    await Friend.delete({
      userId: uid,
      friendId: receiver.id,
      status: "invite",
    });
    return true;
  }
}
