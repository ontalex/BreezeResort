import exp from 'express';
import dotenv from 'dotenv';
import test from './routes/test.routes.js';
import auth from './routes/auth.routes.js';
import rooms from './routes/rooms.routes.js';
import clients from './routes/clients.routes.js';
import hotels from './routes/hotels.routes.js';

dotenv.config();

const app = exp();

app.use(exp.json());

app.use("/api", [test, auth, rooms, clients, hotels]);

app.listen(process.env.SERVER_PORT || 8080, (err) => {
    if (err) {
        console.log(">>> SERVER ERROR <<<")
    } else {
        console.log(`>>> SERVER START http://localhost:${process.env.SERVER_PORT} <<<`);
    };
});