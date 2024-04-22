const nodemailer = require("nodemailer");
const email = process.env.EMAIL;
const emailPassword = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "GMAIL",
  auth: {
    user: email,
    pass: emailPassword,
  },
});
module.exports = transporter;
