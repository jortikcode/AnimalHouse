const nodemailer = require("nodemailer");

const sendEmail = (options) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    // Deve essere true solo per la porta 465
    secureConnection: false,
    // secure SMTP
    port: 587,
    tls: {
      ciphers: "SSLv3",
    },
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.EMAIL_USER,
    to: options.dest,
    subject: options.subject,
    html: options.msg,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendEmail;
