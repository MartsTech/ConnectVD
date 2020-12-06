require("dotenv").config();
const express = require("express");
const http = require("http");
const socket = require("socket.io");

// App Config
const app = express();
const port = process.env.PORT || 8000;

// Server Config
const server = http.createServer(app);
const io = socket(server);

// Socket Config
const rooms = {};

const users = {};

io.on("connection", (socket) => {
  socket.on("join room", (roomID) => {
    if (rooms[roomID]) {
      const length = rooms[roomID].length;
      if (length === 4) {
        socket.emit("room full");
        return;
      }
      rooms[roomID].push(socket.id);
    } else {
      rooms[roomID] = [socket.id];
    }
    users[socket.id] = roomID;
    const usersInRoom = rooms[roomID].filter((id) => id !== socket.id);

    socket.emit("all users", usersInRoom);
  });

  socket.on("sending signal", (payload) => {
    io.to(payload.userToSignal).emit("user joined", {
      signal: payload.signal,
      caller: payload.caller,
    });
  });

  socket.on("returning signal", (payload) => {
    io.to(payload.caller).emit("receiving returned signal", {
      signal: payload.signal,
      id: socket.id,
    });
  });

  socket.on("disconnect", () => {
    const roomID = users[socket.id];
    let room = rooms[roomID];
    if (room) {
      room = room.filter((id) => id !== socket.id);
      rooms[roomID] = room;
      delete users[socket.id];
      io.emit("user left", socket.id);
    }

    if (Object.keys(rooms[roomID]).length === 0) {
      delete rooms[roomID];
    }
  });
});

// Server Listener
server.listen(port, () => console.log(`listening on localhost: ${port}`));
