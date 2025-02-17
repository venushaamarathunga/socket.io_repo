import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import { server, app } from "./socket.js";

import authRoute from "./routes/auth.route.js";
import connectDB from "./db/connectdb.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
dotenv.config();

app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server Running on PORT : ${PORT}`);
});
