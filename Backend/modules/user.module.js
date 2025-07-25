import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name  : {
        type : String,
        min: 2,
        max : 50,
        require : true
    },
    email : {
        type : String,
        unique : true,
        requir : true
    },
    password : {
        type : String,
        require : true
    },
    activationToken : String,
    activeFor : Date,
    address : String,
    phone : String,
    role : {
        type : String,
        enum : ["user", "admin", "superAdmin"],
        default : "user" 
    },
    status : {
        type : String,
        enum : ["active", "inactive"],
        default : "inactive"
    },
    image : String,
    createdBy : {
        type : mongoose.Types.ObjectId,
        ref : "User",
        default : null
    },
    updatedBY : {
        type : mongoose.Types.ObjectId,
        ref : "User",
        default : null
    }
},{
    timestamps : true,
    autoIndex : true,
    autoCreate : true
})

const UserModel = mongoose.model("User", UserSchema)


export default UserModel;