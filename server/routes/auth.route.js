import express from "express";
import { logIn, signUp, logOut } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/login", logIn);

router.post("/signup", signUp);

router.post("/logout", logOut);

export default router;
