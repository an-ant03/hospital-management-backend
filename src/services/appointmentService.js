import { prisma } from "../lib/db.js";

export const createAppointment = async ({
  doctorId,
  patientId,
  startTime,
  endTime
}) => {

  if (startTime >= endTime) {
    throw new Error("Invalid time range");
  }

  // 1️⃣ Check doctor exists
  const doctor = await prisma.doctor.findUnique({
    where: { id: doctorId }
  });

  if (!doctor) {
    throw new Error("Doctor not found");
  }

  // 2️⃣ Check doctor availability
  const availability = await prisma.doctorAvailability.findFirst({
    where: {
      doctorId,
      startTime: { lte: startTime },
      endTime: { gte: endTime }
    }
  });

  if (!availability) {
    throw new Error("Doctor not available during requested time");
  }

  // 3️⃣ Check appointment conflicts
  const conflict = await prisma.appointment.findFirst({
    where: {
      doctorId,
      startTime: {
        lt: endTime
      },
      endTime: {
        gt: startTime
      }
    }
  });

  if (conflict) {
    throw new Error("Doctor already booked during this time");
  }

  // 4️⃣ Create appointment
  const appointment = await prisma.appointment.create({
    data: {
      doctorId,
      patientId,
      startTime,
      endTime
    },
    include: {
      doctor: true,
      patient: true
    }
  });

  return appointment;
};