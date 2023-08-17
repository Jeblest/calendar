const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Goal = require('../models/goal');
const { isLoggedIn } = require('../middleware')
const ObjectId = require('mongoose').ObjectId;



router.post("/goal", async (req, res) => {

    const goal = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" })
    const newGoal = {
        title: goal.title,
        description: goal.description,
        status: goal.status,
        date: goal.date,
        label: goal.label,
        user: user._id
    }
    try {
        const sGoal = new Goal(newGoal)
        await sGoal.save();
        user.goals.push(sGoal._id);
        await user.save();
        res.json(sGoal)
    } catch (error) {
        console.error("Error creating goal:", error);
        res.status(400).json("Failed to create goal")
    }
})

router.get("/goal", async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("goals");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user.goals);
    } catch (error) {
        res.status(400).json({ error: "Failed to get goals" });
    }
});

router.put("/goal/:goalId", async (req, res) => {
    try {
        const goalId = req.params.goalId;
        const updatedGoal = req.body;

        const goal = await Goal.findByIdAndUpdate(goalId, updatedGoal, { new: true });

        if (!goal) {
            return res.status(404).json({ error: "Goal not found" });
        }

        res.json(goal);
    } catch (error) {
        console.error("Error updating goal:", error);
        res.status(400).json({ error: "Failed to update goal" });
    }
});

router.delete("/goal/:goalId", async (req, res) => {
    try {
        const goalId = req.params.goalId;

        const goal = await Goal.findByIdAndDelete(goalId);

        if (!goal) {
            return res.status(404).json({ error: "Goal not found" });
        }
        await User.findByIdAndUpdate(
            req.user.id,
            { $pull: { goals: goalId } }
        );
        res.json({ message: "Goal deleted successfully" });
    } catch (error) {
        console.error("Error deleting goal:", error);
        res.status(400).json({ error: "Failed to delete goal" });
    }
});

module.exports = router;