import exp from 'express';
import dotenv from 'dotenv';
import test from './routes/test.routes.js';
import auth from './routes/auth.routes.js';

dotenv.config();

const app = exp();

app.use(exp.json());

app.use("/api", [test, auth]);

app.listen(process.env.SERVER_PORT || 8080, (err) => {
    if (err) {
        console.log(">>> SERVER ERROR <<<")
    } else {
        console.log(`>>> SERVER START http://localhost:${process.env.SERVER_PORT} <<<`);
    };
});