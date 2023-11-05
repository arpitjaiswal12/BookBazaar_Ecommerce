const express = require("express");
const router = express.Router();

const {SignUp} = require("../../Backend/Controllers/auth_controller.js");

router.post("/signup",SignUp);

module.exports=router;