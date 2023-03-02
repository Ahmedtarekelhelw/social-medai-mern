import express from "express";
import {
  login,
  register,
  logout,
  verifyOtp,
  createResetPassword,
  resetPassword,
} from "../controllers/auth.js";
import { localVariables } from "../middleware/variable.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/createResetPassword", localVariables, createResetPassword);
router.get("/verifyOtp", verifyOtp);
router.patch("/resetPassword", resetPassword);

router.get("/logout", logout);

export default router;
