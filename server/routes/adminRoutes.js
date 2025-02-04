const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyAdminToken, adminCredentials } = require("../middleware/adminAuthMiddleware");
const Complaint = require('../models/Complaint');
require("dotenv").config();
const adminsecret=process.env.adminsecret


router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  
  if (username !== adminCredentials.username) {
    
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const passwordMatch = await bcrypt.compare(password, adminCredentials.password);
  if (!passwordMatch) {
    
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ username: adminCredentials.username }, adminsecret , { expiresIn: "1h" });
  
  res.cookie("AdminAuthToken", token);
  res.json({ message: "Admin login successful" });
});


router.get("/users", verifyAdminToken, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


router.delete("/users/:id", verifyAdminToken, async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


router.get("/complaints", verifyAdminToken, async (req, res) => {
  try {
    
    const complaints = await Complaint.find().populate("userId", "username name");
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/complaints/:id", verifyAdminToken, async (req, res) => {
  try {
    const complaintId = req.params.id;
    await Complaint.findByIdAndDelete(complaintId);
    res.json({ message: "Complaint deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


router.get("/logout", (req, res) => {
  res.clearCookie("AdminAuthToken");
  res.status(200).send("Logout successful");
  return res;
});

module.exports = router;
