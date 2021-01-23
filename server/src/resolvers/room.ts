import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { v4 as uuid } from "uuid";
import { Room } from "../entities/Room";
import { User } from "../entities/User";
import { isAuth } from "../middlewares/isAuth";
import { MyContext } from "../types";

@ObjectType()
class JoinRoomRes {
  @Field(() => [String], { nullable: true })
  users?: string[];
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
  @UseMiddleware(isAuth)
  async createRoom(): Promise<string> {
    const id = uuid();
    await Room.create({ id }).save();
    return id;
  }
  @Mutation(() => JoinRoomRes)
  @UseMiddleware(isAuth)
  async joinRoom(
    @Arg("input") { roomId, socketId }: JoinRoomInput,
    @Ctx() { req }: MyContext
  ): Promise<JoinRoomRes> {
    const room = await Room.findOne({ id: roomId });
    if (!room) {
      return { error: "Room doesn't exist." };
    }
    const user = await User.findOne({
      where: { id: req.session.userId, roomId },
    });
    if (user) {
      return { error: "User already in room." };
    }
    await User.update({ id: req.session.userId }, { socketId, roomId });
    const users = await User.find({ where: { roomId } });
    const socketIds = users.map((user) => {
      return user.socketId;
    });
    return { users: socketIds };
  }
}
