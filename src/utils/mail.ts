import nodemailer from 'nodemailer';
import { config } from '../config';

export const sendMail = async (to: string, subject: string, text: string) => {
  const transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: true,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.pass,
    },
  });

  await transporter.sendMail({
    from: `"Support" <${config.smtp.user}>`,
    to,
    subject,
    text,
  });
};