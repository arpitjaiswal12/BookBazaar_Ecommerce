import express from "express";
import {verifyToken} from "../utils/VerifyUser.js"
import {updateUser, deleteUser,getUserBooks, ContactAdmin } from "../Controllers/user_controller.js"
import {getUserCartItem } from "../Controllers/addToCart_controller.js"
const router=express.Router();

router.post('/update/:id',verifyToken,updateUser);
router.delete('/delete/:id',verifyToken,deleteUser);
router.get('/books/:id',verifyToken,getUserBooks);
router.get('/view-cart/:id',verifyToken,getUserCartItem);
router.post("/contact",ContactAdmin);

export default router;
