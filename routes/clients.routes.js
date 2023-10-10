import { Router } from "express";
import clientsController from "../controllers/clients.controller";

const clients = Router();

clients.post("/register", clientsController.register);
clients.patch("/userdata/:id", clientsController.patchClient);
clients.delete("/userdata/:id", clientsController.deleteClient);
clients.get("/room/:id/userdata/:iduser", clientsController.getRegisteredUser);
clients.get("/usersinroom", clientsController.getAllRoom);

export default clients;