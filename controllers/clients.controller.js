import db from "../db.js";
import { errorServerDB } from "../errors/errors.js";

class Clients {

    register(req, res) {
        let { fio, email, phone, id_childata, birth_date } = req.body;

        console.log(req.body);

        if (Object.keys(req.body).length != Object.values(req.body).length) {
            res.status(401).json(
                {
                    "message": "The given data was invalid.",
                    "errors": {
                        "fio": ["The fio field is required"],
                        "email": ["The email field is required"],
                        "phone": ["The phone field is required"],
                        "id_childdata": ["The id_childdata field is required"],
                        "birth_date": ["The birth_date field is required"]
                    }
                }
            )
            return null;
        }

        let fieldQuery = [fio, email, phone, id_childata, birth_date];
        let sqlQuery = "INSERT INTO clients (fio, email, phone, id_childata, birth_date) VALUES (?, ?, ?, ?, ?);";
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

    patchClient(req, res) {

        // получаем id из паратмеров
        let client_id = req.params.id;

        // формируем список полей для измения
        let fiels = Object.keys(req.body);

        // формируем список занчений полей для измения
        let values = Object.values(req.body);

        console.log('>>> fiels ...', fiels);
        console.log('>>> values ...', values);


        let tmp = fiels.map((item, index) => {
            return `${item} = ${values[index]}`
        }).join(", ");

        // создаём запрос
        let sqlQuery = `UPDATE clients SET ${tmp} WHERE id = ?;`

        let funQuery = (errDB, resDB) => {
            console.log(">>> ERROR DB", errDB);
            console.log('>>> RES DB', resDB);


            if (errDB) {
                console.log(errDB);
                res.status(500).json(errorServerDB);
                return null;
            }


            res.json({
                data: {
                    id: client_id,
                    message: "Updated"
                }
            });
        }

        console.log(sqlQuery);

        db.query(sqlQuery, [client_id], funQuery);

    }

    deleteClient(req, res) {
        // получаем id из паратмеров
        let client_id = req.params.id;

        let sqlQuery = "DELETE FROM clients WHERE id = ?;";
        let funQuery = (errDB, resDB) => {

            console.log(">>> ERROR DB", errDB);

            if (errDB) {
                console.log(errDB);
                res.status(500).json(errorServerDB);
                return null;
            }


            if (resDB.affectedRows == 1) {
                res.json({
                    data: {
                        message: "Deleted"
                    }
                });
            } else {
                res.status(403).json(notFound);
            }
        }

        db.query(sqlQuery, [client_id], funQuery);

    }

    getRegisteredUser(req, res) {
        let {id, iduser} = req.params;

        
    }

    getAllRoom(req, res) {

    }

}

export default new Clients();