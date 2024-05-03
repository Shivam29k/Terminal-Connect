const express = require("express");
const { User } = require("../database/db");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const { authMiddleware } = require("../middleware/middleware");
const { get } = require("mongoose");

const browserRouter = express.Router();

// Signup route
const signupSchema = zod.object({
  username: zod.string().min(3).max(30),
  password: zod.string().min(6),
  name: zod.string().max(30),
  email: zod.string().email(),
});

// Signup route
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
    { name: true, email: true, username: true }
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
      }
    );

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

module.exports = { browserRouter };
