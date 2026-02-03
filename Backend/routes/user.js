import express from "express";
const router = express.Router();
import {signup, login} from "../Controller/user.js";
import {signupValidation, loginValidation} from "../Middleware/Schema.js";

router.post("/signup",signupValidation, signup);
router.post("/login", loginValidation, login);

export default router;