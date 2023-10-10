import { Router } from "express";
import roomsController from "../controllers/rooms.controller.js";
import jwt from "../middleware/jwt.js";

const rooms = Router();

rooms.post('/room', jwt.check, roomsController.addRoom);
rooms.get("/rooms", jwt.check, roomsController.getRooms);
rooms.delete("/room/:id", jwt.check, roomsController.deleteRoom)

export default rooms;