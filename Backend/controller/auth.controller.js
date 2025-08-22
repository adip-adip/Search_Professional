import { fileDelete, randomStringGenerator } from "../utilitis/helper.js"
import authsvc from "../service/auth.service.js";
import {myEvent, EventName} from "../middleware/events.middleware.js";
import { Status } from "../config/constant.config.js";
import jwt from  "jsonwebtoken"
import bcrypt from "bcryptjs";


class AuthController {
    register = async (req, res, next) => { 
        try{

            const data =await authsvc.transformRegisterUser(req)


            await authsvc.registerdata(data)

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
            next(exception)
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

    login = async (req , res, next) => {
        try { 
            const {email, password} = req.body;
            const user = await authsvc.getSingleUserByFilter({
                email : email
            })


            if(bcrypt.compareSync(password, user.password)){
                if(user.status !== Status.ACTIVE) {
                    throw {
                        code : 403,
                        message : "Your account has not been actively setup",
                        status : "USER_NOT_ACTIVE"
                    }
                }else {
                    const accessToken = jwt.sign({
                        sub : user._id
                    }, process.env.JWT_SECRET, {
                        expiresIn : "1 hour"
                    })

                    const refreshToken = jwt.sign({
                        sub : user._id,
                        type : "refresh"
                    }, process.env.JWT_SECRET, {
                        expiresIn : "1 day"
                    })

                    res.json({
                        result : {
                            token : {
                                acess : accessToken,
                                refresh : refreshToken
                            },
                            detail : {
                                _id : user._id,
                                name  : user.name,
                                email : user.email,
                                role : user.role,
                            }
                        },
                        message : `Welcome to ${user.role} pannel`,
                        status : "LOGIN_SUCESS"
                    })
                }
            }else {
                throw {
                    code : 400,
                    message : "Credential doesnot match",
                    status : "CREDENTIAL_DOESNOT_MATCH"
                }
            }
        }catch(exception){
            console.log("This is the error of the login controller", exception)
            next(exception)
        }
        // const { email, password} = req.body


        // const user = await UserActivation.findOne({email});
        // if(!user) {
        //     return res.code(401).json({
        //         message : "User not found"
        //     })
        // }

        // const isMatch = await bcrypt.compare(password, user.password);
        // if(!isMatch) {
        //     return res.code(401).json({
        //         message : "Invalid password"
        //     })
        // }

        // const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn : '1h'})
    }


    activateRegisteredUser = async (req, res, next) => {
        try{
            const token = req.params.token
            const userDetail = await authsvc.getSingleUserByFilter({activationToken : token})

            const tokenExpires = new Date(userDetail.activeFor)
            const today = new Date()

            if(tokenExpires < today) {
                throw {
                    code : 400,
                    message : "Token Expired",
                    status : "Activation Token expired"
                }
            }
            const updateBody = {
                activationToken : null,
                activeFor : null,
                status : Status.ACTIVE
            }

            await authsvc.updateUserById(userDetail._id, updateBody)
            myEvent.emit(EventName.ACTIVATION_EMAIL, {
                name : userDetail.name,
                email : userDetail.email,
                token : userDetail.activationToken
            })

            res.json({
                result : userDetail,
                message : "Your account have been registered sucessfully. Please login to continue",
                status : "Account_Activation_Sucess"

            })
        }catch(exception) {
            next(exception)
        }
    }

    resendToken = async (req, res, next) => {
        try{
            const token = req.params.token;
            const userDetail = await authsvc.getSingleUserByFilter({activationToken : token})

            
            const activationToken = randomStringGenerator(100)
            const activeFor = new Date(Date.now() + (60*60*3*1000))
            
            await authsvc.updateUserById(userDetail._id, {
                activationToken : activationToken,
                activeFor : activeFor
            })

            myEvent.emit(EventName.REGISTER_EMAIL, {
                name : userDetail.name,
                email : userDetail.email,
                token : userDetail.activationToken
            })

            res.json({
                result : {
                    activationToken,
                    activeFor
                },
                message : "An email has been delivered for reactivation Token",
                status : "Activation_Token_Resend"
            })
        }catch(exception) {
            next(exception)
        }
    }
    
     me = async (req, res, next) => {
    try {
        const user = await authsvc.getSingleUserByFilter({ _id: req.user._id });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                status: "USER_NOT_FOUND"
            });
        }

        res.json({
            result: {
                _id: user._id,
                name: user.name,
                email: user.email,
                industry : user.industry,
                location : user.location,
                role: user.role,
                experience : user.experience,
                title : user.title,
                skills : user.skills || []
            },
            message: "Logged in user",
            status: "Logged_In_User"
        });
    } catch (error) {
        next(error);
    }
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
