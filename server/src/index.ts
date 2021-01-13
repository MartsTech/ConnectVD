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
import { socketPayload } from "./types";

const main = async () => {
  // App Config
  const app = express();
  const port = process.env.PORT;

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

  // Socket Endpoints
  const server = http.createServer(app);
  // @ts-ignore
  const io: Server = socket(server, {
    cors: {
      origin: process.env.CLIENT_URL,
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

  io.on("connection", (socket: Socket) => {
    socket.on("get socketId", () => {
      socket.emit("send socketId", socket.id);
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

    socket.on("disconnect", async () => {
      const user = await User.findOne({ where: { socketId: socket.id } });
      const roomId = user?.roomId;

      await User.delete({ socketId: socket.id });
      socket.broadcast.emit("user left", socket.id);

      const users = await User.find({ where: { roomId } });
      if (users.length === 0) {
        await Room.delete({ id: roomId });
      }
    });
  });

  // Server Listenr
  server.listen(port, () => console.log(`listening on localhost: ${port}`));
};
main().catch((err) => console.error(err));
