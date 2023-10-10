import { Router } from "express";
import testController from "../controllers/test.controller.js";
import jwt from "../middleware/jwt.js";

const test = Router();

test.get("/test", testController.test);
test.get("/db", testController.allusers);

export default test;