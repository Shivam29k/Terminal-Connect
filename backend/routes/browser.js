const express = require("express");
const { User, Payment } = require("../database/db");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const {
  authMiddleware,
  decrementCredits,
} = require("../middleware/middleware");
const { get } = require("mongoose");
const { sendOtpMail, sendPaymentAoorovedMail, sendPaymentSubmitMail } = require("../utils/sendmail");
const { PaymentRejectedTemplate } = require("../utils/templates");
const browserRouter = express.Router();

// send otp route
const otps = new Map(); // Temporary store for OTPs

browserRouter.post("/request-otp", async (req, res) => {
  const { email, name } = req.body;
  console.log(email, " - ", name);
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
  otps.set(email, otp);
  setTimeout(() => {
    otps.delete(email);
  }, 5 * 60 * 1000); // Remove OTP after 5 minutes
  sendOtpMail(name, email, otp);
  // console.log(`OTP for ${email} : ${otp} `)
  res.json({ message: "OTP sent to email" });
});

browserRouter.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  console.log(otps.get(email), otp);
  if (otps.get(email) == Number(otp)) {
    otps.delete(email);
    res.json({ message: "OTP verified, proceed to signup" });
  } else {
    res.status(403).json({ message: "Invalid OTP" });
  }
});

// Signup route
const signupSchema = zod.object({
  username: zod.string().min(3).max(30),
  password: zod.string().min(6),
  name: zod.string().max(30),
  email: zod.string().email(),
});

browserRouter.post("/signup", async (req, res) => {
  console.log(req.body);
  const validInputs = signupSchema.safeParse(req.body);

  if (!validInputs.success) {
    return res.status(403).json({
      message: "Incorrect inputs",
    });
  }
  const { username, password, name, email } = validInputs.data;
  const user = await User.create({
    username,
    password,
    name,
    email,
  }).catch((e) => {
    if (e.code === 11000) {
      res.status(403).json({
        message: "Username or Email already exists",
      });
    } else {
      console.log(e);
      res.status(500).json({
        message: "Internal server error while signup",
      });
    }
    return null;
  });
  const token = jwt.sign({ username }, process.env.JWT_SECRET);
  return res.json({ token });
});

// signin route
const signInBody = zod.object({
  username: zod.string(),
  password: zod.string(),
});

browserRouter.post("/signin", async (req, res) => {
  console.log(req.body);
  const validInputs = signInBody.safeParse(req.body);
  if (!validInputs.success) {
    return res.status(403).json({
      message: "Incorrect inputs",
    });
  }
  const { username, password } = validInputs.data;

  const user = await User.findOne({ username, password });
  if (!user) {
    return res.status(403).json({
      message: "Incorrect username or password",
    });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET);
  return res.json({ token });
});

// get user details
// get user details
browserRouter.get("/user", authMiddleware, async (req, res) => {
  const { username } = req;
  const user = await User.findOne(
    { username },
    { name: true, email: true, username: true, credits: true }
  );
  if (!user) {
    return res.status(403).json({
      message: "User not found",
    });
  }
  return res.json(user);
});

// send chat message
const chatSchema = zod.object({
  message: zod.string().min(1),
  sender: zod.string(),
});
browserRouter.post("/sendchat", authMiddleware, async (req, res) => {
  const validInputs = chatSchema.safeParse(req.body);
  if (!validInputs.success) {
    return res.status(403).json({
      message: "Incorrect inputs",
    });
  }

  const { message, sender } = req.body;
  const { username } = req;

  if (!message && !sender) {
    return res.status(403).json({
      message: "Message and sender is required",
    });
  }

  try {
    await User.updateOne(
      { username },
      {
        $push: {
          chat: {
            sender,
            message,
          },
        },
        $inc: { credits: -1 },
      }
    );
    // decrementCredits(username);
    return res.status(200).json({
      message: "Message sent",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error while sending chat message",
    });
  }
});

// get chat messages
browserRouter.get("/getchat", authMiddleware, async (req, res) => {
  const { username } = req;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(403).json({
      message: "User not found",
    });
  }
  const chatMessages = user.chat.map(({ sender, message }) => ({
    sender,
    message,
  }));
  return res.json(chatMessages);
});

// clear chat route
browserRouter.delete("/clearchat", authMiddleware, async (req, res) => {
  const { username } = req;
  try {
    await User.updateOne({ username }, { $set: { chat: [] } });
    return res.status(200).json({
      message: "Chat cleared",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error while clearing chat",
    });
  }
});

// route to set all payment details
// it takes username, amount, upiId, credits, image
const paymentSchema = zod.object({
  email: zod.string().email(),
  amount: zod.number(),
  upiId: zod.string(),
  credits: zod.number(),
  image: zod.string(),
  plan: zod.string(),
  date: zod.string(),
});

browserRouter.post("/payment", authMiddleware, async (req, res) => {
  console.log(req.body);
  const validInputs = paymentSchema.safeParse(req.body);
  if (!validInputs.success) {
    return res.status(403).json({
      message: "Incorrect inputs",
    });
  }
  console.log(validInputs.data);
  const { email, amount, upiId, credits, image, plan, date } = req.body;
  const { username } = req;
  const payment = await Payment.create({
    email,
    username,
    amount,
    upiId,
    credits,
    image,
    plan,
    date,
  }).catch((e) => {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error while payment",
    });
  });
  sendPaymentSubmitMail(username, email);
  return res.json(payment);
});

// send all payment details
browserRouter.get("/payment", authMiddleware, async (req, res) => {
  const { username } = req;
  if (username === "shivam") {
    const payments = await Payment.find();
    return res.json(payments);
  } else {
    return res
      .status(403)
      .json({ message: "You are not authorized to view this page" });
  }
});

// approve a payment by its user id, upond approval credits will be added to the user and the payment will be deleted

const approvePaymentSchema = zod.object({
  uniqueUsername: zod.string(),
  email: zod.string().email(),
  credits: zod.number(),
});

browserRouter.post("/approvepayment", authMiddleware, async (req, res) => {
  const { username } = req;
  if (username === "shivam") {
    const validInputs = approvePaymentSchema.safeParse(req.body);
    if (!validInputs.success) {
      console.log(validInputs.error);
      return res.status(403).json({
        message: "Incorrect inputs",
      });
    }
    const { uniqueUsername, credits, email } = validInputs.data;
    try{
      await User.updateOne({ username: uniqueUsername }, { $inc: { credits } });
      await Payment.deleteOne({ username: uniqueUsername });
      sendPaymentAoorovedMail(uniqueUsername, email);
      return res.json({ message: "Payment approved" });

    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal server error while approving payment",
      });
    }
  }
  return res
    .status(403)
    .json({ message: "You are not authorized to view this page" });
});

// reject a payment by its user id, upond rejection the payment will be deleted
const rejectPaymentSchema = zod.object({
  uniqueUsername: zod.string(),
  email: zod.string().email(),
  message: zod.string(),
});

browserRouter.post("/rejectpayment", authMiddleware, async (req, res) => {
  const { username } = req;
  if (username === "shivam") {
    const validInputs = rejectPaymentSchema.safeParse(req.body);
    if (!validInputs.success) {
      return res.status(403).json({
        message: "Incorrect inputs",
      });
    }
    const { uniqueUsername, email, message} = validInputs.data;
    try {
      await Payment.deleteOne({ username: uniqueUsername });
      PaymentRejectedTemplate(uniqueUsername, email, message);
      return res.json({ message: "Payment rejected" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal server error while rejecting payment",
      });
    }
  }
  return res
    .status(403)
    .json({ message: "You are not authorized to view this page" });
});



module.exports = { browserRouter };
