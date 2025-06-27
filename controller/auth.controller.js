let user = [];

export function register(req, res){ 
    const {username, password} = req.body;

    const userExists = user.find (u => u.username === username);
    if (userExists) {
        return res.json({
            status: 404,
            message: "User already exists"
        })
    }

    user.push({username, password});
    res.json({
        status : 201,
        message : "user register sucessfully"
    });

}
