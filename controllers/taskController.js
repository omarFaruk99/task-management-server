const Task = require("../models/Task");

// Create a new task
const createTask = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is required." });
    }
    const { title, description, status, assignedUser, dueDate } = req.body;
    const task = new Task({
      title,
      description,
      status,
      assignedUser,
      dueDate,
      user: req.user._id, // Link to logged-in user
    });
    await task.save();
    res.status(201).json({ message: "Task created", task });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all tasks for the user, with optional filtering
const getTasks = async (req, res) => {
  try {
    const { status, dueDate } = req.query;
    const filter = { user: req.user._id };

    if (status) {
      filter.status = status;
    }

    if (dueDate) {
      // Assuming dueDate is a date string, you might want to handle date ranges
      filter.dueDate = dueDate;
    }

    const tasks = await Task.find(filter).populate("user", "name email");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is required." });
    }
    const allowedUpdates = ["title", "description", "status", "assignedUser", "dueDate"];
    const updates = Object.keys(req.body);
    const isValidUpdate = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidUpdate) {
      return res.status(400).json({ message: "Invalid updates!" });
    }
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }
    // Update fields
    Object.keys(req.body).forEach((key) => (task[key] = req.body[key]));
    await task.save();
    res.json({ message: "Task updated", task });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
