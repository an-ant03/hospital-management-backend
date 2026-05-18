import express from "express";
import {
  addAvailability,
  getMyAvailability,
  deleteAvailability
} from "../controllers/doctorController.js";
import { authMiddleware } from "../middleware/auth.js";
import { doctorOnly } from "../middleware/role.js";

const router = express.Router();

router.post(
  "/availability",
  authMiddleware,
  doctorOnly,
  addAvailability
);

router.get(
  "/availability",
  authMiddleware,
  doctorOnly,
  getMyAvailability
);

router.delete(
  "/availability/:id",
  authMiddleware,
  doctorOnly,
  deleteAvailability
);

export default router;