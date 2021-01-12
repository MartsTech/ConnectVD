import "dotenv-safe/config";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import path from "path";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { Room } from "./entities/Room";
import { User } from "./entities/User";
import { RoomResolver } from "./resolvers/room";
import http from "http";
import socket, { Server, Socket } from "socket.io";
import { socketPayload } from "./types/socketPayload";

const main = async () => {
  // App Config
  const app = express();
  const port = process.env.PORT || 8000;

  // DB Config
  const connection = await createConnection({
    entities: [Room, User],
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
  });
  connection.runMigrations();
  // await User.delete({});
  // await Room.delete({});

  // Socket Endpoints
  const server = http.createServer(app);
  // @ts-ignore
  const io: Server = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  // Graphql Config
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [RoomResolver],
      validate: false,
    }),
  });
  apolloServer.applyMiddleware({ app, path: "/graphql" });

  const rooms: any = {};
  const users: any = {};

  io.on("connection", (socket: Socket) => {
    socket.on("join room", async (roomId) => {
      if (rooms[roomId]) {
        const length = rooms[roomId].length;
        if (length === 4) {
          socket.emit("room full");
          return;
        }
        rooms[roomId].push(socket.id);
      } else {
        rooms[roomId] = [socket.id];
      }
      await User.create({ socketId: socket.id, roomId }).save();
      users[socket.id] = roomId;
      const usersInRoom = rooms[roomId].filter(
        (id: string) => id !== socket.id
      );
      if (usersInRoom) {
        socket.emit("other users", usersInRoom);
      }
      console.log("Connect: ", rooms, users);
    });

    socket.on("offer", (payload: socketPayload) => {
      io.to(payload.target).emit("offer", payload);
    });

    socket.on("answer", (payload: socketPayload) => {
      io.to(payload.target).emit("answer", payload);
    });

    socket.on("ice-candidate", (payload: socketPayload) => {
      socket.to(payload.target).emit("ice-candidate", payload);
    });

    socket.on("disconnect", () => {
      const roomID = users[socket.id];
      let room = rooms[roomID];
      if (room) {
        room = room.filter((id: string) => id !== socket.id);
        rooms[roomID] = room;
        delete users[socket.id];
        socket.broadcast.emit("user left", socket.id);
      }

      if (rooms[roomID] && Object.keys(rooms[roomID]).length === 0) {
        delete rooms[roomID];
      }
      console.log("Disconnect: ", rooms, users);
    });
  });

  // Server Listenr
  server.listen(port, () => console.log(`listening on localhost: ${port}`));
};
main().catch((err) => console.error(err));
