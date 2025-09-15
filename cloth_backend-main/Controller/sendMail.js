// utils/sendMail.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'developerduco@gmail.com',
    pass: 'hiwu tgtj rkwb hdgq', // Use App Password, not Gmail password
  },
});

const sendOtpEmail = async (to, otp) => {
  const mailOptions = {
    from: 'yourbusiness@gmail.com',
    to,
    subject: 'Your OTP for Login',
    html: `<p>Your OTP is: <b>${otp}</b>. It will expire in 5 minutes.</p>`,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = sendOtpEmail;
