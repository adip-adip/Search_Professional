import bcrypt from "bcryptjs";
import UserModel from "../modules/user.module.js";

const users = [
    {
        name : "Admin",
        email: "admin@searchprofessional.com",
        password : bcrypt.hashSync("Admin123#"),
        role : "superAdmin",
        status : "active"
    }
]

const runUserSeeder = async () => {
    try{
        const populates =  [];
        for(let user of users) {
            const exists = await UserModel.findOne({
                email: user.email
            })
            if(!exists) {
                const userObj = new UserModel(user);
                populates.push(userObj.save())
            }
        }
        if(populates.length) { 
            await Promise.allSettled(populates)
            console.log("User Table seeded sucessfully")
        }

    }catch(exception){
        console.log("Error executing seeder",exception)
    }
}


export default runUserSeeder;