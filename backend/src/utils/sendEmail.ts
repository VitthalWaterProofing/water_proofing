import nodemailer from 'nodemailer';

interface EmailOptions {
  email: string;
  subject: string;
  message: string;
  html?: string;
}

const sendEmail = async (options: EmailOptions) => {
  // Configured for Ethereal Mail (for testing) or SendGrid/SMTP for production
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    auth: {
      user: process.env.SMTP_EMAIL || 'ethereal.user@ethereal.email',
      pass: process.env.SMTP_PASSWORD || 'ethereal_password',
    },
  });

  const message = {
    from: `${process.env.FROM_NAME || 'WaterProofing Agency'} <${process.env.FROM_EMAIL || 'noreply@waterproofing.com'}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  const info = await transporter.sendMail(message);

  console.log(`Message sent: ${info.messageId}`);
};

export default sendEmail;
