import express  from "express";
const router = express.Router();

import {createBook , deleteBook, updateBook} from "../Controllers/createBook_controller.js"
import { verifyToken } from "../utils/VerifyUser.js";

router.post('/createbook',verifyToken, createBook);
router.delete('/delete/:id',verifyToken, deleteBook)
router.post('/update/:id',verifyToken, updateBook)

export default router;