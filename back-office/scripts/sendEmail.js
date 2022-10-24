const nodemailer = require('nodemailer');

const sendEmail = (options) => {
    const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        tls: {
            ciphers: "SSLv3",
        },
        auth: {
          user: 'TW212222@outlook.com',
          pass: 'wsATfs9R'
        }
      });
      
      var mailOptions = {
        from: 'TW212222@outlook.com',
        to: options.dest,
        subject: options.subject,
        html: options.msg
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
};

module.exports = sendEmail;