import express from "express";
import { refreshToken } from "../controllers/refresh.js";

const router = express.Router();

router.get("/", refreshToken);

export default router;
