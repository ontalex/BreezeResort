import exp from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import auth from './routes/auth.routes.js';
import rooms from './routes/rooms.routes.js';
import clients from './routes/clients.routes.js';
import hotels from './routes/hotels.routes.js';

dotenv.config();

// Конфигурация для модуля CORS
let corsConfig = {
    origin: "*"
};

const app = exp();

app.use(exp.json());

app.use("/api", cors(corsConfig), [auth, rooms, clients, hotels]);

// Создаём слушатель сервера
app.listen(process.env.SERVER_PORT || 8080, (err) => {
    if (err) {
        console.log(">>> SERVER ERROR <<<")
    } else {
        console.log(`>>> SERVER START http://localhost:${process.env.SERVER_PORT} <<<`);
    };
});