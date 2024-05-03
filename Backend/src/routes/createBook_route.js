import express  from "express";
const router = express.Router();

import {createBook , deleteBook, updateBook, getBook, getBooks} from "../Controllers/createBook_controller.js"
import { verifyToken } from "../utils/VerifyUser.js";

router.post('/createbook',verifyToken, createBook);
router.delete('/delete/:id',verifyToken, deleteBook)
router.post('/update/:id',verifyToken, updateBook)
router.get('/get/:id', getBook)
router.get('/get', getBooks)

export default router;