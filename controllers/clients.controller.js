import db from "../db.js";
import { errorServerDB, invalid, notFound, validation } from "../errors/errors.js";

class Clients {

    register(req, res) {
        let { fio, email, phone, id_childata, birth_date } = req.body;

        console.log(req.body);

        // Проверка на наличие полей в запросе
        if (!validation(req.body, ["fio", "email", "phone", "id_childata", "birth_date"], { "message": "The given data was invalid.", "errors": {} }, (data) => res.status(403).json(data))) {
            return null;
        }

        let fieldQuery = [fio, email, phone, id_childata, birth_date];
        let sqlQuery = "INSERT INTO clients (fio, email, phone, id_childata, birth_date) VALUES (?, ?, ?, ?, ?);";
        let funQuery = (errDB, resDB) => {

            console.log(">>> ERROR DB", errDB);

            if (errDB && errDB.errno == 1452) {
                console.log(errDB);
                res.status(403).json(notFound);
                return null;
            } else if (errDB && errDB.errno == 1062) {
                console.log(errDB);
                res.status(403).json(invalid("duplicate", "Client already registered"));
                return null;
            } else if (errDB) {
                console.log(errDB);
                res.status(500).json(errorServerDB);
                return null;
            }

            res.status(201).json({
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

        // Проверка на наличие полей в запросе
        if (!validation(req.params, ["id"], { "message": "The given data was invalid.", "errors": {} }, (data) => res.status(403).json(data))) {
            return null;
        }

        // формируем список полей для измения
        let fiels = Object.keys(req.body);

        // формируем список занчений полей для измения
        let values = Object.values(req.body);

        console.log('>>> fiels ...', fiels);
        console.log('>>> values ...', values);


        let tmp = fiels.map((item, index) => {
            return `${item} = '${values[index]}'`
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

            console.log(resDB);

            if(resDB.affectedRows == 0) {
                res.status(403).json(notFound);
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

        // Проверка на наличие полей в запросе
        if (!validation(req.params, ["id"], { "message": "The given data was invalid.", "errors": {} }, (data) => res.status(403).json(data))) {
            return null;
        }

        let sqlQuery = "DELETE FROM clients WHERE id = ?;";
        let funQuery = (errDB, resDB) => {

            console.log(">>> ERROR DB", errDB);

            if (errDB) {
                console.log(errDB);
                res.status(500).json(errorServerDB);
                return null;
            }

            console.log(resDB);
            

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

        db.query(sqlQuery, [client_id], funQuery);

    }

    patchRegisteredUser(req, res) {
        let { id, iduser } = req.params;

        // Проверка на наличие полей в запросе
        if (!validation(req.params, ["id", "iduser"], { "message": "The given data was invalid.", "errors": {} }, (data) => res.status(403).json(data))) {
            return null;
        }

        // создать параметры запроса
        let fieldQuery = [id, iduser];
        // создать строку запроса
        let sqlQuery = "UPDATE clients SET clients.id_childata = ? WHERE clients.id = ?;";
        // создать обработчик
        let funQuery = (errDB, resDB) => {
            console.log(">>> ERROR DB", errDB);
            console.log(">>> RES DB", resDB);

            if (errDB) {
                console.log(errDB);
                res.status(403).json(notFound);
                return null;
            }

            if (resDB.affectedRows == 1) {
                res.status(200).json({
                    data: {
                        message: "Changed"
                    }
                });
            } else {
                res.status(403).json(notFound);
            }
        }
        // создать исполнителя
        db.query(sqlQuery, fieldQuery, funQuery);
    }

    getAllInRoom(req, res) {
        let sqlQuery = "SELECT rooms.name, clients.fio, clients.phone as phonenamber FROM rooms JOIN clients ON rooms.id = clients.id_childata;";
        let funQuery = (errDB, resDB) => {

            if (errDB) {
                console.log(">>> ERROR DB", errDB);
                res.status(403).json(notFound);
                return null;
            }

            if (resDB.length == 0) {
                res.status(403).json(notFound);
                return null;
            } else {
                
                const output = Object.entries(resDB.reduce((acc, item) => {
                    const { name, ...rest } = item;
                    acc[name] = acc[name] || { name: name, data: [] };
                    acc[name].data.push(rest);
                    return acc;
                }, {})).map(([name, data]) => (data));

                res.json({data: output});
            }

        }

        db.query(sqlQuery, funQuery);
    }

}

export default new Clients();