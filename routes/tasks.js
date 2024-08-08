const express = require("express");
const { check, validationResult } = require("express-validator");
const Task = require("../models/task");
const auth = require("../middleware/auth");

const router = express.Router();

router.post(
  "/",
  [auth, check("title", "title is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error("something is not right! ");
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, completed, date } = req.body;

    try {
      const newTask = new Task({
        title,
        description,
        completed,
        date,
        user: req.user.id,
      });
      const task = await newTask.save();
      return res.json(task);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find().sort({ date: -1 });
    return res.json(tasks);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
