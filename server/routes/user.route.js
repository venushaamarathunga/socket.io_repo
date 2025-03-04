import express from "express";
import { verify } from "../jwtUtils/token.js";
import { getUserForSlidBar } from "../controller/user.controller.js";

const router = express.Router();

router.get("/", validateToken, getUserForSlidBar);

export default router;
