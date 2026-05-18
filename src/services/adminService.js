import bcrypt from "bcrypt";
import { prisma } from "../lib/db.js";

export const createDoctorService = async ({
  email,
  password,
  specialization,
}) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: "DOCTOR",
    },
  });

  const doctor = await prisma.doctor.create({
    data: {
      userId: user.id,
      specialization,
    },
    include: {
      user: true,
    },
  });

  return {
    id: doctor.id,
    email: doctor.user.email,
    specialization: doctor.specialization,
  };
};