const User = require("../models/user_model.js")
const bcryptjs = require("bcryptjs");  // this is used to decrypt the password at database level such that if any one can have unauthorized accesss so it can't view the user password
// const { errorHandler } = require("../utils/error.js");


exports.SignUp = async (req, res) => {
    console.log(req.body);
    try {
        const {username,email,password}=req.body;
        const hashedPassword = bcryptjs.hashSync(password,10);
        const newUser = new User({username,email,password : hashedPassword});

        try {
            await newUser.save();
            res.status(201).json('User Created successfully !')
        } catch (error) {
            next(error)
        }
        
    } catch (error) {
        return res.status(500).json({
            error: "Error While Creating User" ,
        });
         
    }
    
};