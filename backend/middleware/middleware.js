const jwt = require("jsonwebtoken");
const User = require("../database/db").User;

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.username = payload.username;
    return next();
  } catch (e) {
    res.status(401).json({
      message: "Unauthorized",
      error: e,
    });
  }
};

// write a middleware to decrement the credits by 1 and if credits == 0 then return a message "No credits left"

const decrementCredits = async (user) => {
  User
    .updateOne({ username }, { $inc: { credits: -1 } })
    .then(() => {
      next();
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error updating credits",
        error: error,
      });
    });
};

module.exports = {
  authMiddleware,
  decrementCredits,
};
