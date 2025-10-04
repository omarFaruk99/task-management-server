const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register a new user
const register = async (req, res) => {
  try {
    // Add check for empty body
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message:
          "Request body is required with name, email, password, and age.",
      });
    }

    const { name, email, password, age } = req.body; // Added password

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 8); // 8 rounds for security

    const user = new User({ name, email, password: hashedPassword, age });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Exclude password from response
    const userResponse = { ...user._doc };
    delete userResponse.password;

    res.status(201).json({
      message: "User registered successfully",
      user: userResponse,
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login user
const login = async (req, res) => {
  try {
    // Add check for empty body
    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ message: "Request body is required with email and password." });
    }

    const { email, password } = req.body; // Added password

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid login credentials." });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid login credentials." });
    }

    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Exclude password from response
    const userResponse = { ...user._doc };
    delete userResponse.password;

    res.json({ message: "Login successful", token, user: userResponse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user profile (protected)
const getProfile = async (req, res) => {
  const userResponse = { ...req.user._doc };
  delete userResponse.password;
  res.json(userResponse);
};

module.exports = { register, login, getProfile };
