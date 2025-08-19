class ExprienceController {
    experience = async (req, res, next) => {
        try{
            const data = req.body;
        }catch(exception) {
            next(exception)
        }
    }
}