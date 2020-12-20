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
      room = room.filter((id) => id !== socket.id);
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

// Server Listener
server.listen(port, () => console.log(`listening on localhost: ${port}`));
