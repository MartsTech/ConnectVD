import { ApolloServer } from "apollo-server-express";
import connectMongo from "connect-mongo";
import cors from "cors";
import "dotenv-safe/config";
import express from "express";
import session from "express-session";
import http from "http";
import path from "path";
import "reflect-metadata";
import socket, { Server, Socket } from "socket.io";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { COOKIE_NAME, __prod__ } from "./constants";
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
  // App Config
  const app = express();
  const port = process.env.PORT || 8000;

  // Middlewares
  const MongoStore = connectMongo(session);
  const sessionMiddleware = session({
    store: new MongoStore({
      url: process.env.MONGO_URL,
      mongoOptions: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
    }),
    name: COOKIE_NAME,
    cookie: {
      httpOnly: true,
      sameSite: __prod__ ? "none" : "lax",
      secure: __prod__,
      maxAge: 1000 * 60 * 60 * 24 * 356,
    },
    saveUninitialized: false,
    secret: process.env.MONGO_SECRET!,
    resave: false,
  });
  app.set("proxy", 1);
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );
  app.use(sessionMiddleware);

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
  const io: Server = socket(server, {
    cors: false,
  });

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
      onConnect: (_, ws: any) => {
        return new Promise((res) =>
          sessionMiddleware(ws.upgradeReq, {} as any, () => {
            res({ req: ws.upgradeReq.session.userId });
          })
        );
      },
    },
  });
  apolloServer.applyMiddleware({ app, path: "/graphql", cors: false });
  apolloServer.installSubscriptionHandlers(server);

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

      await User.update({ socketId: socket.id }, { socketId: "", roomId: "" });
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
