const express = require("express");
const router = express.Router();

const {SignUp, Login, Google} = require("../../Backend/Controllers/auth_controller.js");

router.post("/signup",SignUp);
router.post("/login",Login);
router.post('/google',Google)

module.exports=router;