import { createDoctorService } from "../services/adminService.js";

export const createDoctor = async (req, res) => {
  try {
    const { email, password, specialization } = req.body;

    if (!email || !password || !specialization) {
      return res.status(400).json({
        message: "Email, password, and specialization are required",
      });
    }

    const doctor = await createDoctorService({
      email,
      password,
      specialization,
    });

    res.status(201).json({
      message: "Doctor created successfully",
      doctor,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};