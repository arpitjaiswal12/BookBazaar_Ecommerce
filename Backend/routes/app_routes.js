const express = require("express");
const router = express.Router();

const {SignUp, Login} = require("../../Backend/Controllers/auth_controller.js");

router.post("/signup",SignUp);
router.post("/login",Login);

module.exports=router;