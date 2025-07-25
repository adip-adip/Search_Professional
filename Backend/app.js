import dotenv from "dotenv"
dotenv.config()
import "./config/db.config.js"
import express from 'express';
import route from "./route/auth.route.js";
import { MulterError } from "multer";
import runUserSeeder from "./seeder/user.seeder.js";


const app = express()
runUserSeeder()

//json parser
app.use(express.json());
app.use(express.urlencoded({
    extended : false
}))

app.use("/api/auth", route)


app.use((req, res, next) => {
    next({
        code: 400,
        message : "Resource not found",
        status : "NOT_FOUND"

    })
})

app.use ((error, req, res, next) => {

    console.log("----------------Error Handler----------------",error)

    let result = error.detail || null;
    let message = error.message || "Server error ...";
    let status = error.status || "INTERNAL_SERVER_ERROR";
    let code = error.code || 500;

    if(error instanceof MulterError) {
        code = 400,
        message = "Validation failed",
        result = {
            "image" : "File size is to large"
        }
    }

    if(+error.code === 11000) {
        code = 400;
        message = "Validation failed";
        let msg = {};
        Object.keys(error.keyPattern).map((feild) => {
            msg[feild] = feild+"should be unique"
        })
        result = msg
    }

    res.status(code).json({
        result : result,
        message : message,
        status :status
    })
})


export default app;
