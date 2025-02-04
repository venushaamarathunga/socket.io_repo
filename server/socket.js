import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

const app = express();
dotenv.config();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_API,
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

export { app, io, server };
