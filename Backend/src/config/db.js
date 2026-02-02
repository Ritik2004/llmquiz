import mongoose from "mongoose";

export const connectDB = async () => {
    try{
       const conn = await mongoose.connect("mongodb://127.0.0.1:27017",{
        dbName:"Quizapp",
       });
         console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch(err){
        console.log("Database connection error:", err);
    }
}