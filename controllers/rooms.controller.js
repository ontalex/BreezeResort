import db from "../db.js";
import { errorServerDB, notFound, validation } from "../errors/errors.js";

class Rooms {
    addRoom(req, res) {

        let { name, desc_data } = req.body;

        console.log(req.body);

        // Проверка на наличие полей в запросе
        if (!validation(req.body, ["name", "desc_data"], { "message": "The given data was invalid.", "errors": {} }, (data) => res.status(403).json(data))) {
            return null;
        }

        let fieldQuery = [name, desc_data];
        let sqlQuery = "INSERT INTO rooms (name, desc_data) VALUES (?, ?);";
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

        // Проверка на наличие полей в запросе
        if (!validation(req.params, ["id"], { "message": "The given data was invalid.", "errors": {} }, (data) => res.status(403).json(data))) {
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


            if (resDB.affectedRows == 1) {
                res.status(200).json({
                    data: {
                        message: "Deleted"
                    }
                });
            } else {
                res.status(403).json(notFound);
            }

        }

        db.query(sqlQuery, fieldQuery, funQuery);

    }
}

export default new Rooms();