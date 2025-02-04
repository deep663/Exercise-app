const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  points: { type: Number, default: 0 }, // Total points earned
  completedTasks: [{ type: String }], // List of completed task names
  streak: { type: Number, default: 0 }, // Days of continuous task completion
  assignedDay: { type: Number, default: 1 }, // Day of the predefined plan assigned
});

module.exports = mongoose.model('User', userSchema);
