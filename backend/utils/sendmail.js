const {
  otpTemplate,
  PaymentSubmitTemplate,
  PaymentApprovedTemplate,
  PaymentRejectedTemplate,
} = require("./templates");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtppro.zoho.in",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "tc@shivamk.tech",
    pass: "AmS90teZv8AT",
  },
});

const getMailOptions = (to, subject, html) => {
  return {
    from: {
      name: "Terminal Connect",
      address: "tc@shivamk.tech",
    },
    to: to,
    subject: subject,
    html: html,
  };
};


const sendOtpMail = async (name, email, otp) => {
  console.log(`
    Sending Otp via zoho
    Name: ${name} 
    Email: ${email}
    OTP: ${otp}
  `);

  const to = email;
  const subject = "Terminal Connect OTP Verification";
  const html = otpTemplate(name, otp);
  try {
    const result = await transporter.sendMail(getMailOptions(to, subject, html));
    console.log("Email sent successfully");
  } catch (error) {
    console.error(error);
    console.log("error sending mail.");
  }
};

const sendPaymentSubmitMail = async (username, email) => {
  console.log(`
    Sending Payment Submit Mail to
    Email: ${email}
    username: ${username}
  `);
  const mailOptions = getMailOptions(email, "Payment Submission Successful", PaymentSubmitTemplate(username));
  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error(error);
    console.log("error sending mail.");
  }
};


const sendPaymentAoorovedMail = async (username, email) => {
  console.log(`
    Sending Payment Approved Mail to
    Email: ${email}
    username: ${username}
  `);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "teamterminalc@gmail.com",
      pass: "ewidesvsjucycdck",
    },
  });

  const mainOptions = {
    from: {
      name: "Terminal Connect (noReply)",
      address: "teamterminal@gmail.com",
    },
    to: [email],
    subject: "Credits are added in terminal Connect Account",
    text: "",
    html: PaymentApprovedTemplate(username),
  };
  try {
    const result = await transporter.sendMail(mainOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error(error);
    console.log("error sending mail.");
  }
};
const sendPayemntRejectedMail = async (username, email, message) => {
  console.log(`
    Sending Payment Rejected Mail to
    Email: ${email}
    username: ${username}
  `);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "teamterminalc@gmail.com",
      pass: "ewidesvsjucycdck",
    },
  });

  const mainOptions = {
    from: {
      name: "Terminal Connect (noReply)",
      address: "teamterminal@gmail.com",
    },
    to: [email],
    subject: "Pament Rejected on Terminal Connect",
    text: "",
    html: PaymentRejectedTemplate(username, message),
  };
  try {
    const result = await transporter.sendMail(mainOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error(error);
    console.log("error sending mail.");
  }
};

module.exports = {
  sendOtpMail,
  sendPaymentSubmitMail,
  sendPaymentAoorovedMail,
  sendPayemntRejectedMail,
};

// ewid esvs jucy cdck
