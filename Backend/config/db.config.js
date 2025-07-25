import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();


const initdb = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName : process.env.MONGODB_NAME,
            autoCreate : true,
            autoIndex : true 
        })
        console.log("Database Server connected sucessfully")
    }catch (exception){
        console.log("Database Exception", exception);
        process.exit(1)
    }
}


initdb()