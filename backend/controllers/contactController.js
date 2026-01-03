require('dotenv').config();
const nodemailer = require('nodemailer');

exports.saveMessage = async (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true', 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.RECIPIENT_EMAIL,
    subject: 'New Contact Form Message',
    text: `You have a new message from ${name} (${email}):\n\n${message}`,
    html: `<p>You have a new message from <strong>${name}</strong> (${email}):</p><p>${message}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`[EMAIL SENT] To: ${process.env.RECIPIENT_EMAIL}`);
    res.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('[EMAIL ERROR]', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};