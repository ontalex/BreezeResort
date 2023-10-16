import { Router } from "express";
import hotelsController from "../controllers/hotels.controller.js";
import jwt from "../middleware/jwt.js";

const hotels = Router();

hotels.post("/hotel", jwt.check, hotelsController.addRoom);
hotels.get("/hotels", jwt.check, hotelsController.getAllRooms);
hotels.delete("/hotel/:id", jwt.check, hotelsController.deleteRoom);
hotels.get("/hotel/:id/room/:idroom", jwt.check, hotelsController.mergeRoomInHotel);
hotels.get("/roomsinhotels", jwt.check, hotelsController.getRoomsInHotels);


export default hotels;