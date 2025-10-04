const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to verify JWT token
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", ""); // Get token from header
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify with your .env secret
    const user = await User.findOne({ _id: decoded._id }); // Find the user
    if (!user) {
      throw new Error(); // If no user, fail
    }
    req.user = user; // Add user to request for controllers to use
    next(); // Continue to the route
  } catch (error) {
    res.status(401).json({ message: "Please authenticate." }); // Send error if not logged in
  }
};

module.exports = auth;
