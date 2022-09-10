const nodemailer = require('nodemailer');
const senderInfo = require('../config/account');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: senderInfo.email,
    pass: senderInfo.password,
  },
});

const send = ({ to, text, subject }) => {
  const mailOptions = {
    from: senderInfo.email,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions);
};

module.exports = {
  send,
};
