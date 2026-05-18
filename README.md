# AI Hospital Management Backend

A backend hospital management system with a chatbot to help patients find available doctors. Supports three roles: admin, doctor, and patient.

## Tech Stack
**Backend:** Node.js, Express.js, PostgreSQL, Prisma ORM, JWT  
**AI:** Azure OpenAI Service (GPT-4o)  
**Other:** Nodemailer, EJS

## Features
- Role-based access control for admins, doctors, and patients
- Doctor onboarding and specialty management
- Doctor availability filtering/scheduling with appointment conflict detection
- Appointment booking system with automated email confirmations
- Patient assistance chatbot — uses a system prompt, structured information extraction, and live Prisma database queries to recommend available doctors based on specialty and appointment time

## Setup
1. Clone the repo
2. Run `npm install`
3. Add a `.env` file with:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `AZURE_OPENAI_API_KEY`
   - `AZURE_OPENAI_ENDPOINT`
   - `AZURE_OPENAI_DEPLOYMENT`
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `PORT`
4. Run `npx prisma migrate dev`
5. Run `npm run dev`