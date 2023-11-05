const express=require("express")
const mongoose=require("mongoose");
const dotenv=require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connection successful to database") 
}).catch(()=>{
    console.log(process.env.MONGO)
    console.log("Error while connection")
})

 
const app=express();

app.listen(3000,()=>{
    console.log("Server is running at 3000 ")
})