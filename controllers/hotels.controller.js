import db from "../db.js";
import { invalid, notFound } from "../errors/errors.js";

class Hotels {
    addRoom(req, res) {
        let { name, number } = req.body;

        if (isNaN(name) && isNaN(number)) {
            res.status(401).json(
                {
                    "message": "The given data was invalid.",
                    "errors": {
                        "name": ["The name field is required."],
                        "number": ["The description field is required."]
                    }
                }
            )
            return null;
        }

        let sqlQuery = "INSERT INTO hotels (name, number) VALUES (?, ?);";
        let fieldQuery = [name, number];
        let funQuery = (errDB, resDB) => {
            console.log("\n\n>> RES DB", resDB, "<<<<");
            console.log("\n\n>> ERR DB", errDB, "<<<<");

            if (errDB && errDB.errno == 1062) {

                res.status(403).json(invalid("duplicate", "Hotel already registered"));
                return null;

            } else if (errDB) {

                res.status(500).json(errorServerDB);
                return null;

            }

            res.status(201).json({
                data: {
                    id: resDB.insertId,
                    name: name,
                    number: number
                }
            });

        }

        db.query(sqlQuery, fieldQuery, funQuery);
    }

    getAllRooms(req, res) {
        let sqlQuery = "SELECT name, number FROM hotels;";
        let funQuery = (errDB, resDB) => {

            if (resDB.length == 0) {
                res.status(403).json(notFound);
                return null;
            };

            res.status(200).json({
                list: resDB
            });
        }

        db.query(sqlQuery, funQuery);
    }

    deleteRoom(req, res) {
        let { id } = req.params;

        let sqlQuery = "DELETE FROM hotels WHERE id = ?;";
        let fieldQuery = [id];
        let funQuery = (errDB, resDB) => {

            console.log("\n\n>> RES DB", resDB, "<<<<");
            console.log("\n\n>> ERR DB", errDB, "<<<<");

            if (isNaN(id) || resDB) {
                res.status(403).json(notFound);
                return null;
            }


        }

        db.query(sqlQuery, fieldQuery, funQuery);

    }

    mergeRoomInHotel(req, res) {
        let { id, idroom } = req.params;

        if (isNaN(id) || isNaN(idroom)) {
            res.status(401).json(
                {
                    "message": "The given data was invalid.",
                    "errors": {
                        "id": ["The id field is required."],
                        "idroom": ["The id room field is required."]
                    }
                }
            )
            return null;
        }

        let fieldQuery = [id, idroom];
        let sqlQuery = "UPDATE rooms SET idhotel = ? WHERE id = ?;";
        let funQuery = (errDB, resDB) => {

            console.log(">>> ERROR DB", errDB);
            console.log(">>> RES DB", resDB);

            if (errDB) {
                console.log(errDB);
                res.status(403).json(notFound);
                return null;
            }

            if (resDB.affectedRows == 1) {

                db.query(
                    "SELECT rooms.name, hotels.name as title FROM rooms JOIN hotels ON rooms.idhotel = hotels.id WHERE rooms.id = ?;",
                    [idroom],
                    (errDBNext, resDBNext) => {

                        console.log(">> Res >> ", resDBNext);

                        res.status(201).json({
                            data: {
                                name: resDBNext[0].name,
                                title: resDBNext[0].title
                            }
                        });
                        return null;

                    }
                );
                return null;
            } else {
                res.status(403).json(notFound);
                return null;
            }

        }

        db.query(sqlQuery, fieldQuery, funQuery);
    }

    getRoomsInHotels(req, res) {

    }

}

export default new Hotels();