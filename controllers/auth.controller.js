import db from "../db.js";
import { errorServerDB, invalid, validation } from "../errors/errors.js";
import jwt from "../middleware/jwt.js";

class Auth {

    signup(req, res) {

        let { username, password } = req.body;

        // Проверка на наличие логина и пароля
        if (!validation(req.body, ["username", "password"], { "message": "Invalid", "errors": {} }, (data) => res.status(403).json(data))) {
            return null;
        }

        // формируем данные для запроса
        let fieldQuery = [username, password];
        let sqlQuery = "INSERT INTO users (username, password) VALUES (?, ?);";
        let funQuery = (errDB, resDB, fielsDB) => {

            // Проверка на дубликаты данных в БД
            if (errDB && errDB.errno == 1062) {

                res.status(403).json(invalid("duplicate", "Administrator already registered"));
                return null;

            } else if (errDB) {
                console.log(errDB);
                res.status(500).json(errorServerDB);
                return null;
            }

            res.json({
                data: {
                    message: "Administarator created"
                }
            });
        }

        db.query(sqlQuery, fieldQuery, funQuery);

    }

    async login(req, res) {

        let { username, password } = req.body;

        // Проверка на наличие логина и пароля
        if (!validation(req.body, ["username", "password"], { "message": "Invalid", "errors": {} }, (data) => res.status(403).json(data))) {
            return null;
        }

        // формируем данные для запроса
        let fieldQuery = [username, password];
        let sqlQuery = "SELECT * FROM users WHERE username = ? AND password = ?;";
        let funQuery = (errDB, resDB, fielsDB) => {

            console.log('>> ERRDB', errDB);
            console.log('>> RESDB', resDB);

            if (resDB.length > 0) {
                console.log(resDB[0]);
                res.json(
                    {
                        data: {
                            token_user: `Bearer ${jwt.create(resDB[0]["username"], resDB[0]["id"])}`
                        }
                    }
                )
            } else {
                res.status(401).json({
                    message: "Unauthorized",
                    errors: {
                        login: "Invalid credentials"
                    }
                })
            }
        }

        db.query(sqlQuery, fieldQuery, funQuery);
    }

}

export default new Auth();