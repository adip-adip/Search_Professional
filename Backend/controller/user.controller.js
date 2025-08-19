import UserModel from "../modules/user.module.js";
import userSvc from "../service/user.service.js";

class UserController {
    getUserList = async (req, res, next) => {
        try {
            const user = await UserModel.find({}, "-password"); //This help to exclude the password feild from the mongodb
            res.status(200).json(user)
        } catch (exception) {
            console.log("Error fetching error", exception);
            res.status(500).json({
                message: "Internal server error"
            })
        }
    }

      getUserById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await UserModel.findById(id, "-password");

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json({ result: user });
        } catch (exception) {
            console.log("Error fetching user by id:", exception);
            res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    update = async (req, res, next) => {
        try {
            const userId = req.user?._id || req.params.id; // From token or params
            const updatedUser = await userSvc.updateUser(req.body, userId);

            res.json({
                result: updatedUser,
                meta: null
            });
        } catch (exception) {
            console.log("user update error", exception)
            throw exception
        }
    }
}

const userCtrl = new UserController()
export default userCtrl;



