import express from "express";
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import { isAuthenticate } from "../middlewares/isAuthenticated.js";


const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);


router.put("/update-profile",isAuthenticate,updateProfile);
router.get("/check",isAuthenticate,checkAuth);

export default router;
