import express from "express";
import { AuthService } from "../services/auth.service.js";
import { upload } from "../config/upload.config.js";

const router = express.Router();

const authService = new AuthService();

router.post("/register", async (req, res, next) => {
  try {
    const { user, token } = await authService.register(req.body);
    res.status(201).json({ user, token });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { user, token } = await authService.login(req.body);
    res.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
});

export default router; 