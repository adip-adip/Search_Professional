import UserModel from "../modules/user.module.js";


export async function getUserList(req, res){
    try{
        const user = await UserModel.find({}, "-password"); //This help to exclude the password feild from the mongodb
        res.status(200).json(user)
    }catch(exception){
        console.log("Error fetching error", exception);
        res.status(500).json({
            message : "Internal server error"
        })
    }
}