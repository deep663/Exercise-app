const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: String,
  reps: String,
  duration: String,
});

const dailyPlanSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true,
  },
  workoutPlan: [taskSchema], 
  dietPlan: {
    breakfast: String,
    lunch: String,
    dinner: String,
  },
  tips: String,
});

module.exports = mongoose.model('DailyPlan', dailyPlanSchema);
