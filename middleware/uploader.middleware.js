import multer, { memoryStorage } from "multer";

const myStorage = multer.diskStorage({
    destination : (req, res, cb) => {
        const path = "./public/uploads"+req.uploadDir

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


export default uploader;