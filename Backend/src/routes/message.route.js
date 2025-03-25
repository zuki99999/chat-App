import express from "express";
import { checkAuth, signup, updateProfile } from "../controllers/auth.controller.js";
import { isAuthenticate } from "../middlewares/isAuthenticated.js";
import { getMessages, getUserForSidebar, sendMessage } from "../controllers/message.controller.js";


const router = express.Router();

router.post("/users",isAuthenticate,getUserForSidebar);
router.get("/:id",isAuthenticate,getMessages);

router.post("/send/:id",isAuthenticate,sendMessage)


;

export default router;
