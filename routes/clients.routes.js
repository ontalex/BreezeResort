import { Router } from "express";
import clientsController from "../controllers/clients.controller.js";
import jwt from "../middleware/jwt.js";


const clients = Router();

clients.post("/register", jwt.check, clientsController.register);
clients.patch("/userdata/:id", jwt.check, clientsController.patchClient);
clients.delete("/userdata/:id", jwt.check, clientsController.deleteClient);
clients.get("/room/:id/userdata/:iduser", jwt.check, clientsController.patchRegisteredUser);
clients.post("/usersinroom", jwt.check, clientsController.getAllInRoom);

export default clients;