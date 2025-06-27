import { Router } from "express";
import { register } from "../controller/auth.controller.js";


const route  = Router();


route.post('/register', register)



export default route;