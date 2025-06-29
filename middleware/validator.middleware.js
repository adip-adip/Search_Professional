const bodyValidator =  (schema) => {
    return async (req, res, next) => {
        try{
            const data = req.body;
            
            const response = await schema.validateAsync(data, {abortEarly : false})
            console.log(response)
            next()
        }catch (exception) { 
            let error = {}
            exception.details.map((value, index) => {
                error[value.context.key] = value.message
            })
            next({
                code : 400,
                detail : error,
                message : "Validation Failed",
                status : "VALIDATION_FAILED"
            })
        }
    }
}

export default bodyValidator;