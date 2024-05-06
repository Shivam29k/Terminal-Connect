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
  date: {
    type: Date,
    default: Date.now,
  },
  paid: {
    type: Boolean,
    default: false,
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
  credits: {
    type: Number,
    default: 5,
  },
});


const Payment = mongoose.model("payments", {
  username: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  upiId: {
    type: String,
    required: true,
  },
  credits: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  plan: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = { User, Payment };
