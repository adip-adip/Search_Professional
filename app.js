import express from 'express';
import authRouter from './route/auth.route.js'


const app = express()

//json parser
app.use(express.json());
app.use(express.urlencoded({
    extended : false
}))

app.use("/api/auth", authRouter)

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

    res.status(code).json({
        result : result,
        message : message,
        status :status
    })
})


export default app;
