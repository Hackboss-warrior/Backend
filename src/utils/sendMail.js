import nodemailer from "nodemailer";
import "dotenv/config";
import generateError from "./generateError.js";
//Preparamos el transportador de emails
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Función de envio de emails
const sendMail = async (email, subject, body) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: subject,
      text: body,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    generateError("Ha ocurrido un error en el envío del correo", 400);
  }
};

export default sendMail;
