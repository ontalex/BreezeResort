import db from "../db.js";

class Rooms {
    addRoom(req, res) {

    }
    getRooms(req, res) {
        res.json("Hello");
    }
    deleteRoom(req, res) {
        const { id } = req.params;
    }
}

export default new Rooms();