import { Router } from "express";
import hotelsController from "../controllers/hotels.controller";

const hotels = Router();

hotels.post("/hotel", hotelsController.addRoom);
hotels.get("/hotels", hotelsController.getAllRooms);
hotels.delete("/hotel/:id", hotelsController.deleteRoom);
hotels.get("/hotel/:id/room/:idroom", hotelsController.getRoomInHotel);

export default hotels;