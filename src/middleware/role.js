export const adminOnly = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

export const doctorOnly = (req, res, next) => {
  if (req.user.role !== "DOCTOR") {
    return res.status(403).json({ message: "Doctor access only" });
  }
  next();
};

export const patientOnly = (req, res, next) => {
  if (req.user.role !== "PATIENT") {
    return res.status(403).json({ message: "Patient access only" });
  }
  next();
};