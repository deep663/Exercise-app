const User = require("../models/User");
const DailyPlan = require("../models/DailyPlan");
const Guide = require("../models/Guide");
const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();


//route: Daily Tasks
router.get("/assign/:userId", authMiddleware, async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const dailyPlan = await DailyPlan.findOne({ day: user.assignedDay });
    if (!dailyPlan)
      return res.status(404).json({ message: "Daily plan not found" });

    res.json({
      message: `Tasks assigned for Day ${user.assignedDay}`,
      dailyPlan,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
});


//route: Complete Task
router.post("/complete-task/:userId", authMiddleware, async (req, res) => {
  const { userId } = req.params;
  const { taskName } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.completedTasks.includes(taskName)) {
      return res.status(400).json({ message: "Task already completed" });
    }

    user.completedTasks.push(taskName);

    const dailyPlan = await DailyPlan.findOne({ day: user.assignedDay });
    const task = dailyPlan.workoutPlan.find((t) => String(t.name).trim() === String(taskName).trim());
    if (!task) return res.status(404).json({ message: "Task not found" });

    user.points += task.points || 10;
    await user.save();

    res.json({
      message: "Task completed successfully",
      points: user.points,
      streak: user.streak,
      completedTasks: user.completedTasks,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


//route: User Progress
router.get("/progress/:userId", authMiddleware, async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const dailyPlan = await DailyPlan.findOne({ day: user.assignedDay });
    if (!dailyPlan) 
      return res.status(404).json({ message: "Daily plan not found" });

    const totalTasks = dailyPlan.workoutPlan.length;
    const completedTasks = user.completedTasks.length;
    const remainingTasks = totalTasks - completedTasks;
    // console.log(remainingTasks);

    res.json({
      points: user.points,
      streak: user.streak,
      completedTasks: user.completedTasks,
      remainingTasks: remainingTasks >= 0 ? remainingTasks : 0, 
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Complete the day and assign next day tasks
router.post("/complete-day/:userId", authMiddleware, async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Ensure all tasks for the day are completed
    const dailyPlan = await DailyPlan.findOne({ day: user.assignedDay });
    const allTasksCompleted = dailyPlan.workoutPlan.every((task) =>
      user.completedTasks.includes(task.name)
    );

    if (!allTasksCompleted) {
      return res
        .status(400)
        .json({ message: "Complete all tasks to finish the day" });
    }

    // Increment streak
    user.streak += 1;

    // Assign the next day's tasks
    user.assignedDay += 1;

    user.completedTasks = [];

    await user.save();

    res.json({
      message: `Day ${user.assignedDay - 1} completed. Next day assigned.`,
      streak: user.streak,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


//router: Guide for daily tasks
router.post("/guide", async (req, res) => {
  
  const taskName  = req.body.taskName.trim();
  // console.log(taskName);
  try {
    const guide = await Guide.findOne({ name: new RegExp(taskName, "i")});
    if (!guide) return res.status(404).json({ message: "Guide not found" });

    res.status(200).json({
      name: guide.name,
      steps: guide.steps,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
