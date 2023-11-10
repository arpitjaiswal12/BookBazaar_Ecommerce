import express from 'express';
import {updateUser} from '../Controllers/user_controller.js';
import { verifyToken } from '../utils/VerifyUser.js';


const router = express.Router();

router.post('/update/:id', verifyToken, updateUser)



export default router;