import express from "express";
const router = express.Router();
import { gemini } from "../controllers/resController.js";

router.post("/gemini-res",gemini);

export default router;