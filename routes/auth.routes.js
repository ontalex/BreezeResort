import { Router } from "express";
import authController from "../controllers/auth.controller.js";

const auth = Router();

auth.post("/signup", authController.signup);

auth.post("/login", authController.login);

export default auth;