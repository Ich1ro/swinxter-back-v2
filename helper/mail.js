const nodemailer = require("nodemailer");

const Mailsend = (req, res, data) => {
  // // Create a transporter object with your SMTP server configuration
  // const transporter = nodemailer.createTransport({
  //   service: "Gmail",
  //   auth: {
  //     user: process.env.Nodemailer_id,
  //     pass: process.env.Nodemailer_pass,
  //   },
  // });

  const transporter = nodemailer.createTransport({
    host: "mail.swinxter.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.Nodemailer_id,
      pass: process.env.Nodemailer_pass,
    },
  });

  var mailOptions = data;

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email sending failed:", error);
      return res.status(500).send({ error: "Email sending failed" });
    } else {
      console.log("Email sent:", info.response);
      return res.status(200).send({ message: "Email sent successfully", info });
    }
  });
};

module.exports = Mailsend;
