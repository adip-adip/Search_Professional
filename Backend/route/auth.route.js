import { Router } from "express";
import bodyValidator from "../middleware/validator.middleware.js";
import { loginDTO, registerDTO } from "../contracts/auth.contract.js";
import { setPath, uploader } from "../middleware/uploader.middleware.js";
import authCtrl from "../controller/auth.controller.js";
import { getUserList } from "../controller/user.controller.js";
const route  = Router();


route.post('/register', 
    setPath('/users'), uploader.single("image"),
    // tmpUpload.single('image'),
    bodyValidator(registerDTO),authCtrl.register)

route.get('/activate/:token', authCtrl.activateRegisteredUser)
route.get('/re-send/activation/:token', authCtrl.resendToken)

route.get('/me', authCtrl.getLoggedInUser)

route.post("/login",bodyValidator(loginDTO), authCtrl.login)

route.get("/users", getUserList);

// route.get('/activate/:token');

// route.post('/login')

// route.delete('/logout',)



export default route;   