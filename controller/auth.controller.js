import { fileDelete, randomStringGenerator, uploadHelper } from "../utilitis/helper.js"
import bcrypt from "bcryptjs";
import {myEvent, EventName} from "../middleware/events.middleware.js";

class AuthController {
    register = async (req, res, next) => { 
        try{
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

            var salt = bcrypt.genSaltSync(10);
            data.password = bcrypt.hashSync(data.password, salt)
            data.salt = salt

            data.activationToken = randomStringGenerator(100)
            data.tokenExpires = new Date(Date.now() + (60*60*3*1000))

            myEvent.emit(EventName.REGISTER_EMAIL, {
                name : data.name,
                email : data.email,
                token : data.activationToken
            })


            res.json({
                result : data,
                message : "Your account have been registered sucessfully",
                status : "Registration Sucessfull"
            })

            
        }catch(exception) {
            if(req.file) {
                fileDelete(req.file.path)
            }
            console.log("I am here",exception)
        }

      
        // const {username, password} = req.body;
    
        // const userExists = user.find (u => u.username === username);
        // if (userExists) {
        //     return res.status(400).json ({ 
        //         message : "User already exists"
        //     })
        // }
    
        // user.push({username, password});
        // res.json({
        //     status : 201,
        //     message : "user register sucessfully"
        // });
    }

    login = async (req , res) => {

    }
}

const authCtrl = new AuthController()
export default authCtrl
// let user = [];


// export function register(req, res, nexr){ 
//     // const {username, password} = req.body;

//     // const userExists = user.find (u => u.username === username);
//     // if (userExists) {
//     //     return res.status(400).json ({ 
//     //         message : "User already exists"
//     //     })
//     // }

//     // user.push({username, password});
//     // res.json({
//     //     status : 201,
//     //     message : "user register sucessfully"
//     // });


//     const data = req.body;

//     let error = {}

//     if(!data ||!data.email){
//         error =  {
//             ...error,
//             email : "Email is required"
//         }
//     }

//     if(!data ||!data.password) {
//         error = {
//             ...error,
//             password : "Password is required"
//         }
//     }

//     if(Object.keys(error).length) { 
//         next({
//             detail : error,
//             message : "Validation failed",
//             status : "Registration failed",
//             code : 400
//         })
//     }

//     // if(!data ||!data.email) {
//     //     res.status(400).json({
//     //         result : {
//     //             email : "Email is required"
//     //         },
//     //         message : "Validation failed",
//     //         status : "Registration failed"
//     //     })
//     // }else {
//     //     const output = {}
//     //     res.json({
//     //         result : data,
//     //         message : "Your account have been created sucessfully. Please check your mail for further processing",
//     //         status : "Registration_Sucess"
//     //     })
//     // }

    

   
//     }
