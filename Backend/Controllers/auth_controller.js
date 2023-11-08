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

exports.Google = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email }); // extracting the email of user from request body and save to email object 
      if (user) { // here user is exist in database i.e already signup
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // creating a web token 
        const { password: pass, ...rest } = user._doc; // securing the passowrd 
        res
          .cookie('access_token', token, { httpOnly: true })
          .status(200)
          .json(rest);
      } else { // here user is not exist 
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8); // creating the random 16 digit password 
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);  // hasing the password to secure it in backend 
        const newUser = new User({   // creating a new user 
          username:
            req.body.name.split(' ').join('').toLowerCase() +
            Math.random().toString(36).slice(-4), 
          email: req.body.email,
          password: hashedPassword,
          avatar: req.body.photo,
        });
        console.log(newUser)
        await newUser.save(); // saving the user to database 
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = newUser._doc;
        res
          .cookie('access_token', token, { httpOnly: true })
          .status(200)
          .json(rest);
      }
    } catch (error) {
      next(error);
    }
};
