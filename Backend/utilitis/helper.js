import { cloudinary } from "../config/ cloudinary.config.js"
import fs from "fs"
const uploadHelper = async (filepath) => {
    try{
       const uploadFile = await cloudinary.uploader.upload(filepath, {resource_type : "auto"});
       fileDelete(filepath)
       return uploadFile.secure_url
    }catch(exception) {
        console.log(exception)
        throw {
            code : 400,
            message : "File cannot be uploaded at the moment"
        };
    }
}


const fileDelete = (path) => {
    if(fs.existsSync(path)){
        fs.unlinkSync(path)
    }
}


const randomStringGenerator = (len = 100) => {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const length = chars.length;
    let random = ""
    for (let i=0; i<len; i++) {
        const posn = Math.ceil(Math.random()*(length-1))
        random += chars[posn]
    }
    return random
}

export {uploadHelper, fileDelete, randomStringGenerator};