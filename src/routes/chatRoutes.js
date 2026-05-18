import { askAI } from "../services/aiService.js";
import prisma from "../lib/db.js";

export const chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    // STEP 1: Ask AI to extract structured info
    const extractionPrompt = [
      {
        role: "system",
        content: `
Extract the following from the user's message:
- specialty (e.g., cardiologist, dermatologist)
- startTime (ISO format)
- endTime (ISO format, assume 1 hour after start)

Respond ONLY in JSON like:
{
  "specialty": "",
  "startTime": "",
  "endTime": ""
}
        `,
      },
      {
        role: "user",
        content: message,
      },
    ];

    const extractionResult = await askAI(extractionPrompt);

    let parsed;
    try {
      parsed = JSON.parse(extractionResult);
    } catch {
      return res.json({ reply: "Sorry, I couldn’t understand your request." });
    }

    const { specialty, startTime, endTime } = parsed;

    if (!specialty || !startTime || !endTime) {
      return res.json({
        reply: "Please specify a doctor type and time clearly.",
      });
    }

    // STEP 2: Query DB for available doctors
    const doctors = await prisma.doctor.findMany({
      where: {
        specialty: {
          contains: specialty,
          mode: "insensitive",
        },
        availabilities: {
          some: {
            startTime: { lte: new Date(startTime) },
            endTime: { gte: new Date(endTime) },
          },
        },
        appointments: {
          none: {
            OR: [
              {
                startTime: { lt: new Date(endTime) },
                endTime: { gt: new Date(startTime) },
              },
            ],
          },
        },
      },
      include: {
        user: true,
      },
    });

    // STEP 3: Send results back to AI for natural reply
    const finalPrompt = [
      {
        role: "system",
        content: `
You are a hospital assistant.
Respond nicely and clearly to the patient.
        `,
      },
      {
        role: "user",
        content: `
User asked: "${message}"

Available doctors:
${JSON.stringify(doctors)}
        `,
      },
    ];

    const reply = await askAI(finalPrompt);

    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};