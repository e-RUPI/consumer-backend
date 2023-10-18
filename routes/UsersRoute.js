const express = require("express");
const mongoose = require("mongoose");
const Users = require("../models/Users");

const router = express.Router();

// GET all users with optional filters
router.get("/", async (req, res) => {
  try {
    const filter = {};

    if (req.query.mobileNumber) {
      filter.mobileNumber = req.query.mobileNumber;
    }

    const users = await Users.find(filter);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching users" });
  }
});

router.post("/login", async function (req, res, next) {
  const { mobileNumber, password } = req.body;

  let existingUser;
  try {
    existingUser = await Users.findOne({ mobileNumber });
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res
      .status(404)
      .json({ message: "Couldn't Find User By This Mobile Number" });
  }

  // Check the password
  if (password !== existingUser.password) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  return res.status(200).json({
    message: "Login Successful",
    user: existingUser,
  });
});

router.post("/signup", async function (req, res) {
  const {
    userName,
    name,
    aadharNumber,
    panNumber,
    mobileNumber,
    accountNumber,
    password,
    occupation,
  } = req.body;

  try {
    // Check for uniqueness in the database
    const existingUser = await Merchant.findOne({
      $or: [
        { userName },
        { aadharNumber },
        { panNumber },
        { mobileNumber },
        { accountNumber },
      ],
    });

    if (existingUser) {
      return res.status(400).json({ message: "Duplicate entry found." });
    }

    // Create a new user record without password hashing
    const newUser = new Users({
      userName,
      name,
      aadharNumber,
      panNumber,
      mobileNumber,
      accountNumber,
      password, // Not hashed
      occupation,
    });

    // Save the user in the database
    await newUser.save();

    res.status(201).json({ message: "Signup Successful", user: newUser });
  } catch (err) {
    handleError(err, res);
  }
});

module.exports = router;
