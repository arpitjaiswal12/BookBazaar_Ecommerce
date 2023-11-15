import express  from "express";
const router = express.Router();

import {createBook , deleteBook} from "../Controllers/createBook_controller.js"
import { verifyToken } from "../utils/VerifyUser.js";

router.post('/createbook',verifyToken, createBook);
router.delete('/delete/:id',verifyToken, deleteBook)

export default router;