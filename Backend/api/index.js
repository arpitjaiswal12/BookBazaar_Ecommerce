import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import dbConnect from "../src/config/database.js";
import cookieParser from "cookie-parser";
import authRoute from "../src/routes/auth_route.js";
import userRoute from "../src/routes/user_route.js";
import createBookRoute from "../src/routes/createBook_route.js";
// import contactAdmin from "./routes/contact_route.js"
import cartRoute from "../src/routes/addToCart_route.js";
import path from "path";

dotenv.config();
dbConnect();

// const __dirname = path.resolve();
const app = express();

// middleware to parse json request body
app.use(express.json());

app.use(cookieParser());

//mounts (adding/ appending the ) todo API routes :: when user hits the user the bydefault path is atteached with the entered request

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/book", createBookRoute);
app.use("/api/cart", cartRoute);
// app.use("/api/user",contactAdmin);

// app.use(express.static(path.join(__dirname,'/Frontend/dist')));

// app.get('*',(req,res)=>{
//   res.sendFile(path.join(__dirname, 'Frontend', 'dist', 'index.html'));
// });

app.listen(3000, () => {
  console.log("Server is running at 3000 ");
});

app.get("/",(req,res)=>{
  res.send("<h1>Backend of BookBazaar</h1>")
})

// create a middleware function to handle possible error
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
