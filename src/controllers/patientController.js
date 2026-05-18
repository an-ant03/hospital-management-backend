import * as patientService from "../services/patientService.js";

export const searchDoctors = async (req, res) => {
  try {
    const { specialty, startTime, endTime } = req.query;

    if (!specialty || !startTime || !endTime) {
      return res.status(400).json({
        message: "specialty, startTime and endTime are required"
      });
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (start >= end) {
      return res.status(400).json({
        message: "Invalid time range"
      });
    }

    const doctors = await patientService.findAvailableDoctors({
      specialty,
      start,
      end
    });

    res.json(doctors);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};