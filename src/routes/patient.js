import express from "express";
import { searchDoctors } from "../controllers/patientController.js";
import { authMiddleware } from "../middleware/auth.js";
import { patientOnly } from "../middleware/role.js";

const router = express.Router();

router.get(
  "/doctors/search",
  authMiddleware,
  patientOnly,
  searchDoctors
);

export default router;