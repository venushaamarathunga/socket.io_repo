import express from "express";
import { sendMessage, getMessage } from "../controller/message.controller.js";
import { validateToken } from "../jwtUtils/token.js";

const router = express.Router();

router.get("/:id", validateToken, getMessage);
router.post("/send/:id", validateToken, sendMessage);

export default router;
