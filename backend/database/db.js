const mongoose = require("mongoose");
require("dotenv").config();
const URL = process.env.DB_URL;

mongoose.connect(URL).then(() => console.log("Connected to DB"));

const User = mongoose.model("users", {
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
 chat: [
  {
    sender: {
      type: String,
    },
    message: {
      type: String,
    },
  },
],
  msgCount: {
    type: Number,
    default: 100,
  },
});

module.exports = { User };
