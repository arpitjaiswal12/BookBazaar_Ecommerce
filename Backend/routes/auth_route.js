import express  from "express";
const router = express.Router();

import  {SignUp, Login, Google} from "../../Backend/Controllers/auth_controller.js" ;

router.post("/signup",SignUp);
router.post("/login",Login);
router.post('/google',Google)

export default router;