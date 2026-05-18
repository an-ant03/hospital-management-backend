import express from "express";
import { bookAppointment } from "../controllers/appointmentController.js";
import { authMiddleware } from "../middleware/auth.js";
import { patientOnly } from "../middleware/role.js";

const router = express.Router();

router.post(
  "/book",
  authMiddleware,
  patientOnly,
  bookAppointment
);

export default router;