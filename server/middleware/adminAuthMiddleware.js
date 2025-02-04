const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const adminsecret=process.env.adminsecret

const adminCredentials = {
  username: "admin",
  password: "$2b$10$S/1yuKxvXAktl5V72QJoPesJzdnL40GQghjbwJGfUuYLfWqMBqI0i"
};

function verifyAdminToken(req, res, next) {
  const token = req.cookies.AdminAuthToken;
  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }
  try {
    const decoded = jwt.verify(token, adminsecret);
    req.admin = decoded; 
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = { verifyAdminToken, adminCredentials };
