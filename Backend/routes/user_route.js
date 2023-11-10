const express = require ("express");

// import { verifyToken } from '../utils/VerifyUser';
const verifyToken = require("../utils/VerifyUser")
// import {updateUser} from "../Controllers/user_controller"
const {updateUser} =require( "../Controllers/user_controller")

const router=express.Router();


router.post('/update/:id', verifyToken, updateUser)

// export default router;