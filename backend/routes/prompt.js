import express from "express";
const router = express.Router();
import { savePrompt, getUserPrompts } from "../controllers/promptController.js";

router.post("/save", savePrompt);
router.post("/ret", getUserPrompts);

export default router;
