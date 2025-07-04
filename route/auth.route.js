import { Router } from "express";
import bodyValidator from "../middleware/validator.middleware.js";
import { registerDTO } from "../contracts/auth.contract.js";
import { setPath, uploader } from "../middleware/uploader.middleware.js";
import { tmpUpload } from "../config/ cloudinary.config.js";
import authCtrl from "../controller/auth.controller.js";
const route  = Router();


route.post('/register', 
    setPath('/users'), uploader.single("image"),
    // tmpUpload.single('image'),
    bodyValidator(registerDTO),authCtrl.register)


// route.get('/activate/:token');

// route.post('/login')

// route.delete('/logout',)



export default route;   