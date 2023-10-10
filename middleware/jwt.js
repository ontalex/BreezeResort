import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { unauth } from "../errors/errors.js";

config()

class JWTVer {
    create(usernameData, userIdData) {

        let token = jwt.sign(
            { data: { username: usernameData, userId: userIdData } },
            process.env.SECRETKEY,
            { expiresIn: "1h" });

        return token;

    }

    check(req, res, next) {
        try {

            let token = req.headers.authorization.split(' ')[1];

            jwt.verify(token, process.env.SECRETKEY, (err, decod) => {
                if (err) {
                    console.log(">>>> ERROR VERTOKEN <<<<", err);
                    console.log(err);
                    console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
                    res.status(403).json(unauth);
                } else {
                    next(req, res);
                }

            });

        } catch (error) {

            res.status(403).json(unauth);

        }
    }
}

export default new JWTVer();