const express = require("express");
const {
  register,
  login,
  getProfile,
} = require("../controllers/authController");
const auth = require("../middleware/auth");

const router = express.Router();
const User = require("../models/User");

// GET all users (existing route)
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Register route (uses controller)
router.post("/register", register);

// Login route (uses controller)
router.post("/login", login);

// Get profile (protected)
router.get("/profile", auth, getProfile);

module.exports = router;
