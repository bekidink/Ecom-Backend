import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
  console.log("Provide SMTP_USER and SMTP_PASSWORD in the .env file");
}

const transporter = nodemailer.createTransport({
  service: "gmail", // You can change this to any email service (Gmail, Outlook, etc.)
  auth: {
    user: process.env.SMTP_USER, // Your email address
    pass: process.env.SMTP_PASSWORD, // Your email password or app-specific password
  },
});

const sendEmail = async ({
  sendTo,
  subject,
  html,
}: {
  sendTo: string;
  subject: string;
  html: string;
}) => {
  try {
    const mailOptions = {
      from: `"Binkeyit" <${process.env.SMTP_USER}>`, // Sender address
      to: sendTo, // Receiver address
      subject: subject, // Subject line
      html: html, // HTML content
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;
