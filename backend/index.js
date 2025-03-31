import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/user.route.js"
import messageRoute from "./routes/message.route.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import {server,app} from "./socket/socket.js";


dotenv.config({});
// const app = express();

app.use(cors({
  origin: "http://localhost:5173", // Replace with your frontend URL
  credentials: true, // Allow cookies to be sent
}));


// middleware
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser());


// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute)

// connectDB().then(()=>{
//     app.listen(process.env.PORT || 8080, ()=>{
//       console.log(`Server is running at port ${process.env.PORT} `);  
//     });
//   }).catch((err)=>{
//     console.log("MONGO DB connection failed. ",err);
    
//   })
  server.listen(process.env.PORT || 8080, ()=>{
    connectDB();
    console.log(`Server listen at prot ${process.env.PORT}`);
});
