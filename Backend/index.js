const express=require("express")
// const mongoose=require("mongoose");
const dotenv=require('dotenv');
const app=express();

const dbConnect=require("./config/database.js"); 
dbConnect();

// middleware to parse json request body
app.use(express.json());

const aapRoutes=require("./routes/app_routes.js")
//mounts (adding/ appending the ) todo API routes :: when user hits the user the bydefault path is atteached with the entered request
app.use("/api/v1", aapRoutes); 
 


app.listen(3000,()=>{
    console.log("Server is running at 3000 ")
})