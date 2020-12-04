const express = require("express");
const http = require("http");
const socket = require("socket.io");

// App Config
const app = express();
const port = process.env.PORT || 8000;

// Server Config
const server = http.createServer(app);
const io = socket(server);

// Socket Endpoints
const users = {};

const socketToRoom = {};

io.on("connection", (socket) => {
  socket.on("join room", (roomID) => {
    if (users[roomID]) {
      users[roomID].push(socket.id);
    } else {
      users[roomID] = [socket.id];
    }
    socketToRoom[socket.id] = roomID;
  });

  socket.on("disconnect", () => {
    const roomID = socketToRoom[socket.id];
    let room = users[roomID];
    if (room) {
      room = room.filter((id) => id !== socket.id);
      users[roomID] = room;
      delete socketToRoom[socket.id];
    }

    if (Object.keys(users[roomID]).length === 0) {
      delete users[roomID];
    }
  });
});

// Server Listener
server.listen(port, () => console.log(`listening on localhost: ${port}`));
