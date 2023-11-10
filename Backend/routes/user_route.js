import express from "express";
import {verifyToken} from "../utils/VerifyUser.js"
import {updateUser} from "../Controllers/user_controller.js"

const router=express.Router();

router.post('/update/:id',verifyToken,updateUser);

export default router;
