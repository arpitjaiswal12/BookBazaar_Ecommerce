const User = require("../models/user_model.js")
const bcryptjs = require("bcryptjs");  // this is used to decrypt the password at database level such that if any one can have unauthorized accesss so it can't view the user password
const { errorHandler } = require("../utils/error.js");
const jwt = require("jsonwebtoken");


exports.SignUp = async (req, res) => {
    console.log(req.body);
    try {
        const {username,email,password}=req.body;
        const hashedPassword = bcryptjs.hashSync(password,10);
        const newUser = new User({username,email,password : hashedPassword});

        try {
            await newUser.save();
            res.status(201).json('User created successfully!');
        } catch (error) {
            next(error)
        }
        
    }catch (error) {
        return res.status(500).json({
            error: "Error While Creating User" ,
        });
         
    }
    
};

exports.Login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const validUser = await User.findOne({ email }); // finding email from db
      if (!validUser) return next(errorHandler(404, 'User not found! Please SignUp')); // is email is valid or not 
      const validPassword = bcryptjs.compareSync(password, validUser.password);  //finding the password from db
      if (!validPassword) return next(errorHandler(401, 'Wrong credentials!')); // is password is valid or not 
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET); // creating  a token that makes user login for period of time 
      const { password: pass, ...rest } = validUser._doc;  //destructure the passwords as user can'nt see the password 
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest); //return all thing except password 
    } catch (error) {
      next(error);
    }
  };