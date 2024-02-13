const mailer = require("nodemailer");

const sendMail = async (to, subject, text) => {
  const transporter = mailer.createTransport({
    service: "gmail",
    auth: {
      user: "pythonforsamir@gmail.com",
      pass: "mrrwgiorayjbdnrl",
    },
  });
  const mailOptions = {
    from: "pythonforsamir@gmail.com",
    to: to,
    subject: subject,
    text: text,
    //html: '<h1>Welcome</h1><p>That was easy!</p>',
  };

  const res = await transporter.sendMail(mailOptions);
  console.log(res);
};
module.exports = {sendMail};