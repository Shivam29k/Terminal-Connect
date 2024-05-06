const express = require("express");
const { User } = require("../database/db");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const { get } = require("mongoose");
const { decrementCredits } = require("../middleware/middleware");

const terminalRouter = express.Router();

// verify user
const verifySchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});
terminalRouter.post("/verify", async (req, res) => {
  console.log(req.body);
  const validInputs = verifySchema.safeParse(req.body);
  if (!validInputs.success) {
    return res.status(403).json({
      message: "Incorrect inputs",
    });
  }

  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(403).json({
        message: "Invalid username or password",
        verified: false,
      });
    }
    return res.status(200).json({
      message: "User verified",
      verified: true,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error while verifying user",
      verified: false,
    });
  }
});

const chatSchema = zod.object({
  message: zod.string().min(1),
  sender: zod.string(),
  username: zod.string(),
  password: zod.string(),
});

terminalRouter.post("/sendchat", async (req, res) => {
  const validInputs = chatSchema.safeParse(req.body);
  if (!validInputs.success) {
    return res.status(403).json({
      message: "Incorrect inputs",
    });
  }

  const { message, sender, username, password } = req.body;

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
    decrementCredits(username);
    return res.status(200).json({
      message: "Chat message sent",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error while sending chat message",
    });
  }
});

// get chat messages
getChatSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

terminalRouter.get("/getchat", async (req, res) => {
  const params = req.query;
  console.log(params);
  const validInputs = getChatSchema.safeParse(params);
  if (!validInputs.success) {
    return res.status(403).json({
      message: "Incorrect inputs",
    });
  }
  try {
    const user = await User.findOne({
      username: params.username,
      password: params.password,
    });
    if (!user) {
      return res.status(403).json({
        message: "User not found",
      });
    }
    const chat = user.chat.map((c) => {
      return {
        sender: c.sender,
        message: c.message,
      };
    });
    return res.status(200).json(chat);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error while getting chat messages",
    });
  }
});


// clear chat 
clearChatSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});
terminalRouter.delete("/clearchat", async (req, res) => {
  const validInputs = clearChatSchema.safeParse(req.body);
  if (!validInputs.success) {
    return res.status(403).json({
      message: "Incorrect inputs",
    });
  }

  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(403).json({
        message: "User not found",
      });
    }
    await User.updateOne(
      { username, password },
      {
        $set: {
          chat: [],
        },
      }
    );
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

module.exports = { terminalRouter };
