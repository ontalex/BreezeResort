import db from "../db.js";
import { noneLoginOrPass, errorServerDB } from "../errors/errors.js";

class Auth {

    signup(req, res) {

        let { username, password } = req.body;
        if (!(username && password)) { 
            res.status(401).json(noneLoginOrPass);
            return null;
        }

        let fieldQuery = [username, password];
        let sqlQuery = "INSERT INTO users (username, password) VALUES (?, ?);";
        let funQuery = (errDB, resDB, fielsDB) => {

            if(errDB) {
                console.log(errDB);
                res.status(500).json(errorServerDB);
                return null;
            }

            res.json(resDB);
        }

        db.query(sqlQuery, fieldQuery, funQuery);

    }

    async login(req, res) {

        let { username, password } = req.body;
        if (!(username && password)) { 
            res.status(401).json(noneLoginOrPass);
            return null;
        }

        let fieldQuery = [username, password];
        let sqlQuery = "SELECT * FROM users WHERE username = ? AND password = ?;";
        let funQuery = (errDB, resDB, fielsDB) => {

            if(errDB) {
                console.log(errDB);
                res.status(500).json(errorServerDB);
                return null;
            }

            res.json(resDB);
        }

        db.query(sqlQuery, fieldQuery, funQuery);
    }

}

export default new Auth();