import express  from "express";
const router = express.Router();

import {createBook} from "../Controllers/createBook_controller.js"
import { verifyToken } from "../utils/VerifyUser.js";

router.post('/createbook',verifyToken, createBook);

export default router;