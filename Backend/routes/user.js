import express from "express";
const router = express.Router();
import {signup, login, logoutUser} from "../Controller/user.js";
import {signupValidation, loginValidation} from "../Middleware/Schema.js";

router.post("/signup",signupValidation, signup);
router.post("/", loginValidation, login);
router.post("/logout", logoutUser)

export default router;