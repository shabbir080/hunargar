import express from "express";
import { forgetPassword, login, logout, signup, verifyEmail, profile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);
router.post("/forget_password", forgetPassword);
router.get("/profile", protectRoute, profile);


export default router;
