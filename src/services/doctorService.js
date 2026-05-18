import { prisma } from "../lib/db.js";

export const createAvailability = async (
  doctorId,
  startTime,
  endTime
) => {
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (start >= end) {
    throw new Error("End time must be after start time");
  }

  
  const conflict = await prisma.doctorAvailability.findFirst({
    where: {
      doctorId,
      OR: [
        {
          startTime: { lt: end },
          endTime: { gt: start }
        }
      ]
    }
  });

  if (conflict) {
    throw new Error("Overlapping availability slot exists");
  }

  return prisma.doctorAvailability.create({
    data: {
      doctorId,
      startTime: start,
      endTime: end
    }
  });
};

export const getDoctorAvailability = (doctorId) => {
  return prisma.doctorAvailability.findMany({
    where: { doctorId },
    orderBy: { startTime: "asc" }
  });
};

export const deleteAvailability = async (doctorId, slotId) => {
  const slot = await prisma.doctorAvailability.findUnique({
    where: { id: slotId }
  });

  if (!slot || slot.doctorId !== doctorId) {
    throw new Error("Slot not found");
  }

  return prisma.doctorAvailability.delete({
    where: { id: slotId }
  });
};