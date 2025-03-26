import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/user.route.js"
import messageRoute from "./routes/message.route.js"
import cookieParser from "cookie-parser";



dotenv.config({});
const app = express();

// middleware
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser());


// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute)

connectDB().then(()=>{
    app.listen(process.env.PORT || 5000, ()=>{
      console.log(`Server is running at port ${process.env.PORT} `);  
    });
  }).catch((err)=>{
    console.log("MONGO DB connection failed. ",err);
    
  })