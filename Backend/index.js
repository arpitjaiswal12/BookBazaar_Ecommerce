const express=require("express")
// const mongoose=require("mongoose");
const dotenv=require('dotenv');
const app=express();

const dbConnect=require("./config/database.js"); 
dbConnect();

// middleware to parse json request body
app.use(express.json());

const appRoutes=require("./routes/auth_route.js");

//mounts (adding/ appending the ) todo API routes :: when user hits the user the bydefault path is atteached with the entered request

app.use("/api/auth", appRoutes);  

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