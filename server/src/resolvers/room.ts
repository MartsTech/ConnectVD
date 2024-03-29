import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { getConnection } from "typeorm";
import { v4 as uuid } from "uuid";
import { Room } from "../entities/Room";
import { User } from "../entities/User";

@ObjectType()
class UserInfo {
  @Field()
  socketId: string;
}

@ObjectType()
class JoinRoomRes {
  @Field(() => [UserInfo], { nullable: true })
  users?: UserInfo[];
  @Field(() => String, { nullable: true })
  error?: string;
}

@InputType()
class JoinRoomInput {
  @Field()
  roomId: string;
  @Field()
  socketId: string;
}

@Resolver(Room)
export class RoomResolver {
  @Query(() => [Room])
  async rooms(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor?: string
  ): Promise<Room[]> {
    const realLimit = Math.min(50, limit) + 1;

    const replacements: any[] = [realLimit];

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }

    const rooms = await getConnection().query(
      `
          select r.*
          from room r
          ${cursor ? `where r."createdAt" < $2` : ""}
          order by r."createdAt" DESC
          limit $1
        `,
      replacements
    );
    return rooms;
  }
  @Mutation(() => String)
  async createRoom(@Arg("uid") uid: string): Promise<string> {
    const user = await User.findOne({ where: { id: uid } });
    if (!user) {
      throw new Error("not authenticated");
    }
    const id = uuid();
    await Room.create({ id }).save();
    return id;
  }
  @Mutation(() => JoinRoomRes)
  async joinRoom(
    @Arg("uid") uid: string,
    @Arg("input") { roomId, socketId }: JoinRoomInput
  ): Promise<JoinRoomRes> {
    const room = await Room.findOne({ id: roomId });
    if (!room) {
      await Room.create({ id: uid }).save();
    }
    await User.update({ id: uid }, { socketId, roomId });
    const users = await User.find({ where: { roomId } });
    const usersInfo = users.map((user) => {
      return { socketId: user.socketId };
    });
    return { users: usersInfo };
  }
}
