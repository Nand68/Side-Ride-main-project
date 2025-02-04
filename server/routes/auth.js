const express = require("express");
const router = express.Router();
const User = require("../models/User");
// const Complaint = require('../models/Complaint');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const usersecret=process.env.usersecret;


router.post("/register", async (req, res) => {
  try {
   
    const userDetails = req.body;
    const username = userDetails.userName;
    const name=userDetails.name;
    const gender=userDetails.gender;
    const age=userDetails.age;
    const email = userDetails.email;
    const phone=userDetails.phone;
    const password = userDetails.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username,name,gender,age,email,phone, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("err", error);
    res.status(500).json({ error: "Registration failed" });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(401)
        .json({ error: "Authentication failed- User doesn't exists" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: "Authentication failed- password doesn't match" });
    }
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      usersecret ,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("Authtoken", token);
    res.json({
      status: true,
      message: "login success",
      token,
      username: user.username,
      userId:user._id
    });
    
    return res;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Login failed" });
  }
});


router.get("/logout", (req, res) => {
  res.clearCookie("Authtoken");
  res.status(200).send("Logout successful");
  return res;
});

module.exports = router;
