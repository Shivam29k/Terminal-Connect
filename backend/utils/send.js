const nodemailer = require("nodemailer");
const { otpTemplate } = require("./templates");

const sendOtpMail = async (name, email, otp) => {
  console.log(`
      Sending Otp via zoho
      Name: ${name} 
      Email: ${email}
      OTP: ${otp}
    `);
  const transporter = nodemailer.createTransport({
    host: "smtppro.zoho.in",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "tc@shivamk.tech",
      pass: "AmS90teZv8AT",
    },
  });


  const mailOptions = {
    from: "tc@shivamk.tech",
    name: "Terminal COnnect",
    to: email,
    subject: "Terminal Connect OTP Verification",
    html: otpTemplate(name, otp),
  }
  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error(error);
    console.log("error sending mail.");
  }
};


sendOtpMail("Shivam", "skumarshivam50@gmail.com", 312312);