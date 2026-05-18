import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send appointment confirmation email
export const sendAppointmentEmail = async (to, data) => {
  try {
    const templatePath = path.join(
      __dirname,
      "../views/appointment-confirmation.ejs"
    );

    const html = await ejs.renderFile(templatePath, data);

    await transporter.sendMail({
      from: `"Hospital System" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Appointment Confirmation",
      html,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Email error:", error);
  }
};