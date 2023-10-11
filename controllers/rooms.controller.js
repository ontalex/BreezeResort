import db from "../db.js";
import { errorServerDB } from "../errors/errors.js";

class Rooms {
    addRoom(req, res) {

        console.log('>>> DECODE CONTROLLER', req.decode_body);
        

        let { name, desc_data } = req.body;

        console.log(req.body);


        if (!(name && desc_data)) {
            res.status(401).json(
                {
                    "message": "The given data was invalid.",
                    "errors": {
                        "name": ["The name field is required."],
                        "desc_data": ["The description field is required."]
                    }
                }
            )
            return null;
        }

        let fieldQuery = [name, desc_data, req.decode_body.userId];
        let sqlQuery = "INSERT INTO rooms (name, desc_data, idhotel) VALUES (?, ?, (SELECT idhotel FROM users WHERE id = ?));";
        let funQuery = (errDB, resDB) => {

            console.log(">>> ERROR DB", errDB);

            if (errDB) {
                console.log(errDB);
                res.status(500).json(errorServerDB);
                return null;
            }


            res.json({
                data: {
                    message: "Created"
                }
            });
        }

        db.query(sqlQuery, fieldQuery, funQuery);
    }

    getRooms(req, res) {

        let sqlQuery = "SELECT id, name, desc_data FROM rooms;";
        let funQuery = (errDB, resDB) => {

            console.log(">>> ERROR DB", errDB);
            

            if (errDB) {
                console.log(errDB);
                res.status(500).json(errorServerDB);
                return null;
            }

            res.json({
                list: [...resDB]
            });
        }

        db.query(sqlQuery, funQuery);
    }

    deleteRoom(req, res) {
        const { id } = req.params;

        if (!id) {
            res.status(401).json(
                {
                    "message": "The given data was invalid.",
                    "errors": {
                        "id": ["The id_room field is required."]
                    }
                }
            )
            return null;
        }

        let fieldQuery = [id];
        let sqlQuery = "DELETE FROM rooms WHERE id = ?;";
        let funQuery = (errDB, resDB) => {

            console.log('>> DB ERRR', errDB);
            console.log('>> DB RES', resDB);
            
            if (errDB) {
                console.log(errDB);
                res.status(500).json(errorServerDB);
                return null;
            }

            console.log([resDB.affectedRows]);

            res.json({
                data: {
                    message: "Deleted"
                }
            });
        }

        db.query(sqlQuery, fieldQuery, funQuery);

    }
}

export default new Rooms();