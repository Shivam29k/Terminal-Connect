const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next)=> {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(401).json({
      message: "Unauthorized"
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
      error: e
    });
  }
}

module.exports = { 
  authMiddleware
}