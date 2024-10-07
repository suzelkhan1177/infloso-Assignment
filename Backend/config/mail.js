const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMIAL_ID,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  module.exports = transporter;