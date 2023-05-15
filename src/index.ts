import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from 'cors';
import "dotenv/config";
import mongoose from "mongoose";

import router from "./router";
import { config } from "./config/keys";


const app = express();

app.use(cors({ credentials: true }))

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json())


mongoose.Promise = Promise;
mongoose.connect(config.mongodb_test)
    .then(() =>
        console.log("connected to db")
    )
    .catch((error: Error) => {
        console.log(error);
    })


mongoose.connection.on('error', (error: Error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("db connected")

    }
})


app.use('/', router());

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server runnig at ${3000}`);

})

