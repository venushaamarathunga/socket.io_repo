import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { server, app } from "./socket.js";

app.use(cors());
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server Running on PORT : ${PORT}`);
});
