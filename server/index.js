const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID : ${socket.id}, Joined ID : ${data}`);
  });

  socket.on("send_msg", (data) => {
    socket.to(data.room).emit("receive_msg", data);
  });

  socket.on("disconnet", () => {
    console.log("User disconnected ", socket.id);
  });
});

server.listen(4000, () => {
  console.log("Server Running!! ");
});
