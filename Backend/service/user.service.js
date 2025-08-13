import UserModel from "../modules/user.module.js"

class UserService {
    updateUser = async(data, id) => {
        try{
            const update = await UserModel.findByIdAndUpdate(id, {$set: data}, {new: true});
            return update;
        }catch(exception){
            throw exception;
        }
    }
}


const userSvc = new UserService()
export default userSvc;