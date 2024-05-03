import express  from "express";
const router = express.Router();

import {createCartItem,deleteCartItem} from "../Controllers/addToCart_controller.js"
import { verifyToken } from "../utils/VerifyUser.js";

router.post('/add-cart-item',verifyToken, createCartItem);
router.delete('/delete/:id',verifyToken, deleteCartItem)


export default router;