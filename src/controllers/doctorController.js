import * as doctorService from "../services/doctorService.js";

export const addAvailability = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const { startTime, endTime } = req.body;

    const slot = await doctorService.createAvailability(
      doctorId,
      startTime,
      endTime
    );

    res.status(201).json({
      message: "Availability added",
      slot
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getMyAvailability = async (req, res) => {
  try {
    const slots = await doctorService.getDoctorAvailability(req.user.id);

    res.json(slots);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteAvailability = async (req, res) => {
  try {
    await doctorService.deleteAvailability(
      req.user.id,
      req.params.id
    );

    res.json({ message: "Availability deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};