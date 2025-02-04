const jwt = require("jsonwebtoken");
require("dotenv").config();
const usersecret=process.env.usersecret;

function verifyToken(req, res, next) {
  const token = req.cookies.Authtoken;
  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ error: "Access denied" });
  }
  try {
    const decoded = jwt.verify(token, usersecret);
    req.user = decoded; 
    console.log('Token decoded:', decoded);
    next();
  } catch (error) {
    console.log('Invalid token:', error.message);
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = verifyToken;
