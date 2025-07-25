import multer, { memoryStorage } from "multer";
import fs from 'fs'

const myStorage = multer.diskStorage({
    destination : (req, res, cb) => {
        const path = "./public/uploads"+req.uploadDir

        if(!fs.existsSync(path)){
            fs.mkdirSync(path, {recursive: true})
        }

        cb(null, path)
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split(".").pop();
        const randomNumber = Math.ceil(Math.random()*999)
        const filename = Date.now()+"-"+randomNumber+"."+ext
 
        cb(null, filename)
    } 
})

const uploader = multer({   
    storage : myStorage
});

const setPath = (path) => {
    return (req, res, next) => {
        req.uploadDir = path;
        next()
    }
}


export  {uploader, setPath}