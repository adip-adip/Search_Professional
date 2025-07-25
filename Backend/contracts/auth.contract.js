import Joi from "joi"


const registerDTO = Joi.object({
    name : Joi.string().min(2).max(50).required(),
    email : Joi.string().email().required(),
    password : Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/
).required(),
    confirmPassword : Joi.string().equal(Joi.ref('password')).required().messages({
        "any.only" : "Password and Confirm password doesn't match"
    }),
    phone : Joi.string(),
    address : Joi.string(),
    role : Joi.string().regex(/^(user|admin|superAdmin)$/),
    image : Joi.string()

})

const loginDTO = Joi.object({
    email: Joi.string().email().required(),
    password : Joi.string().required()
})

export {registerDTO , loginDTO}