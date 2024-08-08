import mailgun from "mailgun.js";
import dotenv from "dotenv";

dotenv.config();
export const postQueryService = async (data) => {
  const { name, email, message } = data;
  const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });
  const mailData = {
    from: process.env.MAILGUN_FROM_EMAIL,
    to: "yasovardhan1111@gmail.com", 
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };
  try {
    await mg.messages().send(mailData);
    return { message: "Email sent successfully" };
  } catch (error) {
    return error.message;
  }
};
