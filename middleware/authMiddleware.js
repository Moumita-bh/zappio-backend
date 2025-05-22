// middleware/authMiddleware.js
require("dotenv").config();

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization token missing or invalid" });
  }

  const token = authHeader.split(" ")[1];

  if (token !== process.env.API_TOKEN) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  next();
}

module.exports = authMiddleware;
