import db from "../db.js";
import { noneLoginOrPass } from "../errors/errors.js";

class Auth {

    async signup(req, res) {

        let { username, password } = req.body;
        if (!(username && password)) { 
            res.status(401).json(noneLoginOrPass);
            return null;
        }

        console.log(">> SIGNUP");
        res.json("sign")

    }

    async login(req, res) {

        let { username, password } = req.body;
        if (!(username && password)) { 
            res.status(401).json(noneLoginOrPass);
            return null;
        }

        console.log(">> login");
        res.json("login")
    }

}

export default new Auth();