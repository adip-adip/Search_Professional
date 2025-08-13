import bcrypt from "bcryptjs";
import { randomStringGenerator, uploadHelper } from "../utilitis/helper.js"
import UserModel from "../modules/user.module.js";
import { Status } from "../config/constant.config.js";

class AuthService{
    transformRegisterUser = async (req) => {
        const data = req.body;

        if(req.file) {
            data.image = await uploadHelper(req.file.path)
            // const uploadFile = await uploadHelper(req.file)
            // console.log(uploadFile);
            //     const response = await cloudinary.uploader.upload_stream({
        //         resource_type : "auto"
        //     },(error, result) => {
        //         if(error) {
        //             console.log(error)
        //         }else {
        //             console.log(result)
        //         }
        //     }
        // )
        //     console.log(response)
        }

        data.password = bcrypt.hashSync(data.password, 10)

        data.activationToken = randomStringGenerator(100)
        data.activeFor = new Date(Date.now() + (60*60*3*1000))
        data.status = Status.INACTIVE
        

        return data;
    }
    registerdata = async (data) => {
        try {
            const userObj = new UserModel(data)
            const result = await userObj.save()
            return result
        }catch(exception){
            throw exception
        }
    }

    getSingleUserByFilter = async (filter) => {
        try{
            const user = await UserModel.findOne(filter);
            if(!user) {
                throw {code : 404, message : "User not found", status : "NOT_FOUND"}
            } else {
                return user;
            }

        }catch(exception){
            throw exception
        }
    }

    updateUserById = async (id, data) => {
        try {
            const user = await UserModel.findByIdAndUpdate(id, {$set : data}, {new : true})
            return user;
        }catch (exception) {
            throw exception;
        }
    }

}

const authsvc = new AuthService()
export default authsvc;