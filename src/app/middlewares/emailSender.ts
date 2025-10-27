import nodemailer from "nodemailer";
import config from "../config";

const emailSender = async (email: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use 'true' for port 465, 'false' for all other ports
    auth: {
      user: config.email_sender.user_email_sender,
      pass: config.email_sender.pass_email_sender,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
    from: '"Health Care" <dev.obidyhasan@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Reset Password Link", // Subject line
    // text: "Hello world", // plain text body
    html,
  });
};

export default emailSender;
