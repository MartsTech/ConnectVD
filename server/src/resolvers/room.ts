import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { v4 as uuid } from "uuid";
import { Room } from "../entities/Room";
import { User } from "../entities/User";

@Resolver(Room)
export class RoomResolver {
  @Query(() => [Room])
  async rooms(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
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
  @Query(() => [User])
  async usersInRoom(@Arg("roomId") roomId: string): Promise<User[]> {
    const users = await User.find({ where: { roomId } });
    return users;
  }
  @Mutation(() => Room)
  createRoom(): Promise<Room> {
    const id = uuid();
    return Room.create({ id }).save();
  }
  @Mutation(() => User)
  joinRoom(
    @Arg("roomId") roomId: string,
    @Arg("socketId") socketId: string
  ): Promise<User> {
    return User.create({ socketId, roomId }).save();
  }
}
