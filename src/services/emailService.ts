import nodemailer from 'nodemailer';
import { EmailData } from '../models/types/emailData';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (data: EmailData): Promise<void> => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: data.to,
    subject: data.subject,
    text: data.text,
    html: data.html,
  };

  await transporter.sendMail(mailOptions);
  console.log("email sent!")
};
