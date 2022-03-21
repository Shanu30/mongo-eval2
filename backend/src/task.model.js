const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  status: { type: Boolean, required: true },
  subtask: [String],
});

const Task = mongoose.model("task", taskSchema);

module.exports = Task;
