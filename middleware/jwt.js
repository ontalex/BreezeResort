import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { unauth } from "../errors/errors.js";

config()

class JWTVer {
    create(usernameData, userIdData) {

        let token = jwt.sign(
            { data: { username: usernameData, userId: userIdData } },
            process.env.SECRETKEY,
            { expiresIn: "4h" });

        return token;

    }

    check(req, res, next) {
        try {

            console.log('\n\n>>> CHECKING TOKEN PROCESS....');

            let token = req.headers.authorization.split(' ')[1];

            jwt.verify(token, process.env.SECRETKEY, (err, decod) => {
                if (err) {
                    console.log("\n\n>>>> ERROR VERTOKEN <<<<", err);
                    console.log(err);
                    console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
                    res.status(401).json(unauth);
                } else {
                    console.log('\n\n>>> CHECKING TOKEN PROCESS - ACCESS');
                    next();
                }

            });

        } catch (error) {
            res.status(401).json(unauth);

        }
    }
}

export default new JWTVer();