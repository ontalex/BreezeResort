import { Router } from "express";
import roomsController from "../controllers/rooms.controller";

const rooms = Router();

rooms.post('/room', roomsController.addRoom);
rooms.get("/rooms", roomsController.getRooms);
rooms.delete("/room/:id", roomsController.deleteRoom)

export default rooms;