import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { adminOnly } from "../middleware/role.js";
import { createDoctor } from "../controllers/adminController.js";

const router = express.Router();

router.post(
  "/create-doctor",
  authMiddleware,
  adminOnly,
  createDoctor
);

export default router;