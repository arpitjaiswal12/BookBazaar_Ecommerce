import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import dbConnect from "./config/database.js";
import cookieParser from 'cookie-parser';
import authRoute from "./routes/auth_route.js";
import userRoute from "./routes/user_route.js";
import createBookRoute from "./routes/createBook_route.js";

const app=express();
dotenv.config();

 
dbConnect();

// middleware to parse json request body
app.use(express.json());

app.use(cookieParser());

//mounts (adding/ appending the ) todo API routes :: when user hits the user the bydefault path is atteached with the entered request

app.use("/api/auth", authRoute);  
app.use("/api/user", userRoute);  
app.use("/api/book", createBookRoute);

app.listen(3000,()=>{
    console.log("Server is running at 3000 ")
})


// create a middleware function to handle possible error
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
});