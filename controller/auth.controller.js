import Joi from "joi";
class AuthController {
    register = async (req, res, next) => { 
        try{
            const data = req.body;

            console.log(data)

        }catch(exception) {
            console.log(exception)
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
