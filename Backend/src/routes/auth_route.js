import express  from "express";
const router = express.Router();

import  {SignUp, Login, Google,signOut} from "../Controllers/auth_controller.js" ;

router.post("/signup",SignUp);
router.post("/login",Login);
router.post('/google',Google)
router.get('/signout', signOut)

export default router;