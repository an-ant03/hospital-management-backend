import { prisma } from "../lib/db.js";

export const findAvailableDoctors = async ({ specialty, start, end }) => {

  const doctors = await prisma.doctor.findMany({
    where: {
      specialization: {
        equals: specialty,
        mode: "insensitive"
      },

      availabilities: {
        some: {
          startTime: {
            lte: start
          },
          endTime: {
            gte: end
          }
        }
      },

      appointments: {
        none: {
          startTime: {
            lt: end
          },
          endTime: {
            gt: start
          }
        }
      }
    },

    include: {
      user: {
        select: {
          email: true
        }
      },

      availabilities: true
    }
  });

  return doctors.map((doc) => ({
    id: doc.id,
    email: doc.user.email,
    specialization: doc.specialization,
    availabilities: doc.availabilities
  }));
};