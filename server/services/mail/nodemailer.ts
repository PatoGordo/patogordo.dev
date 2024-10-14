import transporter from "nodemailer";
import { MailData, SendMail } from "./interfaces";

const mailTransporter = transporter.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendMail: SendMail = async (data: MailData) => {
  try {
    await mailTransporter.sendMail({
      to: data?.to,
      from: process.env.MAIL_USERNAME,
      subject: `Personal Website - ${data?.subject}`,
      html: data?.body,
    });
  } catch (error) {
    console.error(
      `[MAIL] Erro ao enviar email "${data?.subject}" para "${data?.to}"`,
      error
    );

    throw createError({
      statusCode: 500,
      statusMessage: "Error on email sent!",
    });
  }
};
