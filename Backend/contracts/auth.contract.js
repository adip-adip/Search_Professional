import Joi from "joi"


const registerDTO = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must be 8-16 characters long, include at least one letter, one number, and one special character.",
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Password and Confirm password doesn't match",
    }),
  title: Joi.string().required(),
  industry: Joi.string().required(),
  location: Joi.string().required(),
  experience: Joi.string().required(),
  skills: Joi.array().items(Joi.string()).min(1).required(),
});


const loginDTO = Joi.object({
    email: Joi.string().email().required(),
    password : Joi.string().required()
})

export {registerDTO , loginDTO}