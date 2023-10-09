import db from "../db.js";

class Test {
    test(req, res) {
        console.log("TEST ---- TEST");
        res.json("TEST");
    }
    async allusers(req, res) {
        console.log(req.body);
        db.query("SELECT * FROM users", (err, resDB) => {

            if(err) res.status(500).json({type: "error"});

            console.log(resDB);
            res.json(resDB);
        });
    }
};

export default new Test();