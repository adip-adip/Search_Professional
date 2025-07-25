import app from "./app.js"


const port = 3001;

// Routes
app.get('/', (req,res) => {
    res.send("This is the homepage")
});

// Starting the server at port 
app.listen(port, (err) => {
    if(!err) { 
        console.log(`Server started at port: ${port}`)
        console.log("please click ctrl+C to discontinue")
    } 
})