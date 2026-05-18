import express from 'express';
import {config} from "dotenv";
import  {connectDB, disconnectDB} from './lib/db.js';
import authRoutes from "./routes/auth.js"
import adminRoutes from "./routes/admin.js";
import doctorRoutes from "./routes/doctor.js";
import patientRoutes from "./routes/patient.js";
import appointmentRoutes from "./routes/appointment.js";
import chatRoutes from "./routes/chatRoutes.js";

config();
connectDB();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true}));

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/doctor", doctorRoutes);
app.use("/patient", patientRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/api/chat", chatRoutes);



const PORT = 3000;

const server = app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});

