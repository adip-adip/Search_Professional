import { Router } from "express";
import authCtrl from "../controller/auth.controller.js";
import {registerDTO} from "../contracts/auth.contract.js"
import bodyValidator from "../middleware/validator.middleware.js";
const route  = Router();


route.post('/register', bodyValidator(registerDTO),authCtrl.register)


// route.get('/activate/:token');

// route.post('/login')

// route.delete('/logout',)



export default route;