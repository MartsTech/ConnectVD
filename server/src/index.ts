import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import "dotenv-safe/config";
import express from "express";
import http from "http";
import path from "path";
import "reflect-metadata";
import socket, { Server, ServerOptions, Socket } from "socket.io";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { Email } from "./entities/Email";
import { Friend } from "./entities/Friend";
import { Room } from "./entities/Room";
import { User } from "./entities/User";
import { EmailResolver } from "./resolvers/email";
import { FriendResolver } from "./resolvers/friend";
import { RoomResolver } from "./resolvers/room";
import { UserResolver } from "./resolvers/user";
import { socketPayload } from "./types";
import { createUserLoader } from "./utils/createUserLoader";

const main = async () => {
  const app = express();
  const port = Number(process.env.PORT) || 8000;

  // Middlewares
  app.set("proxy", 1);
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  // DB Config
  const connection = await createConnection({
    entities: [Room, User, Friend, Email],
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    // ssl: { rejectUnauthorized: false },
    migrations: [path.join(__dirname, "./migrations/*")],
  });
  connection.runMigrations();

  // Socket Endpoints
  const server = http.createServer(app);
  // @ts-ignore
  const ServerOptions: ServerOptions = {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  };
  //@ts-ignore
  const io: Server = socket(server, ServerOptions);

  // Graphql Config
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [RoomResolver, UserResolver, FriendResolver, EmailResolver],
      validate: false,
    }),
    context: ({ req, res, connection }) => ({
      req,
      res,
      connection,
      userLoader: createUserLoader(),
    }),
    subscriptions: {
      path: "/subscriptions",
    },
  });
  apolloServer.applyMiddleware({ app, path: "/graphql", cors: false });
  apolloServer.installSubscriptionHandlers(server);

  // Socket Endpoints
  const rooms: any = {};
  const users: any = {};

  io.on("connection", (socket) => {
    socket.on("join room", (roomID) => {
      if (rooms[roomID]) {
        const lenght = rooms[roomID].lenght;
        if (lenght === 4) {
          socket.emit("room full");
          return;
        }
        rooms[roomID].push(socket.id);
      } else {
        rooms[roomID] = [socket.id];
      }
      users[socket.id] = roomID;
      const usersInRoom = rooms[roomID].filter(
        (id: string) => id !== socket.id
      );
      if (usersInRoom) {
        socket.emit("other users", usersInRoom);
      }
      console.log("Connect: ", rooms, users);
    });

    socket.on("offer", (payload) => {
      io.to(payload.target).emit("offer", payload);
    });

    socket.on("answer", (payload) => {
      io.to(payload.target).emit("answer", payload);
    });

    socket.on("ice-candidate", (payload) => {
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

  // io.on("connection", (socket: Socket) => {
  //   socket.on("get socketId", () => {
  //     socket.emit("send socketId", socket.id);
  //   });

  //   socket.on("offer", (payload: socketPayload) => {
  //     io.to(payload.target).emit("offer", payload);
  //   });

  //   socket.on("answer", (payload: socketPayload) => {
  //     io.to(payload.target).emit("answer", payload);
  //   });

  //   socket.on("ice-candidate", (payload: socketPayload) => {
  //     socket.to(payload.target).emit("ice-candidate", payload);
  //   });

  //   socket.on("toggle video", (state: boolean) => {
  //     socket.broadcast.emit("change video", { id: socket.id, state });
  //   });

  //   socket.on("disconnect", async () => {
  //     const user = await User.findOne({ where: { socketId: socket.id } });
  //     const roomId = user?.roomId;

  //     await User.update({ socketId: socket.id }, { socketId: "", roomId: "" });
  //     socket.broadcast.emit("user left", socket.id);

  //     const users = await User.find({ where: { roomId } });
  //     if (users.length === 0) {
  //       await Room.delete({ id: roomId });
  //     }
  //   });
  // });

  // Server Listenr
  server.listen(port, () => console.log(`listening on localhost: ${port}`));
};
main().catch((err) => console.error(err));
