import nodemailer from "nodemailer";

export default async function sendMails(emails: string[]) {
  if (!emails) {
    return { error: "reciever email not found" };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    logger: true,
    debug: true,
  });
  
  for ( const email of emails) {
      try {
          const mailOptions = {
            from: `"Next.js App" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "New issue raised in this repo",
            text: "Hello! Recently this issue is raised in this repo",
          };
          const info = await transporter.sendMail(mailOptions);
          console.log("Email sent: ", info.messageId);
      
          return { success: "Email sent successfully!" };
        } catch (error) {
          console.log("email sending error");
          return { error: "failed to send email" };
        }
    }
}