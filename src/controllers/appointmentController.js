import * as appointmentService from "../services/appointmentService.js";
import { sendAppointmentEmail } from "../services/emailService.js";

export const bookAppointment = async (req, res) => {
  try {
    const patientId = req.user.id;

    const { doctorId, startTime, endTime } = req.body;

    if (!doctorId || !startTime || !endTime) {
      return res.status(400).json({
        message: "doctorId, startTime and endTime are required"
      });
    }

    const appointment = await appointmentService.createAppointment({
      doctorId,
      patientId,
      startTime: new Date(startTime),
      endTime: new Date(endTime)
    });


     await sendAppointmentEmail(appointment.patient.email, {
      patientName: appointment.patient.name,
      doctorName: appointment.doctor.name,
      date: appointment.startTime.toDateString(),
      time: appointment.startTime.toLocaleTimeString()
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment
    });

  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};