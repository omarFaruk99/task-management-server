const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const auth = require("../middleware/auth");

const router = express.Router();

// Create task (protected)
router.post("/", auth, createTask);

// Get tasks (protected)
router.get("/", auth, getTasks);

// Update task (protected)
router.put("/:id", auth, updateTask);

// Delete task (protected)
router.delete("/:id", auth, deleteTask);

module.exports = router;
