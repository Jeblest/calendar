const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Task = require('../models/task');
const { isLoggedIn } = require('../middleware')
const ObjectId = require('mongoose').ObjectId;



router.post("/task", async (req, res) => {

    const task = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" })
    const newTask = {
        title: task.title,
        description: task.description,
        status: task.status,
        date: task.date,
        label: task.label,
        user: user._id
    }
    try {
        const sTask = new Task(newTask)
        await sTask.save();
        user.tasks.push(sTask._id);
        await user.save();
        res.json(sTask)
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(400).json("Failed to create task")
    }
})

router.get("/task", async (req, res) => {
    console.log(req.user._id)
    try {
        const user = await User.findById(req.user.id).populate("tasks");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user.tasks);
    } catch (error) {
        console.error("Error getting tasks:", error);
        res.status(500).json({ error: "Failed to get tasks" });
    }
});

router.put("/task/:taskId", async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const updatedTask = req.body;

        const task = await Task.findByIdAndUpdate(taskId, updatedTask, { new: true });

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.json(task);
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: "Failed to update task" });
    }
});

router.delete("/task/:taskId", async (req, res) => {
    try {
        const taskId = req.params.taskId;

        const task = await Task.findByIdAndDelete(taskId);

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        console.log(req.user.id)
        await User.findByIdAndUpdate(
            req.user.id, // Find users who have the task ID in their tasks array
            { $pull: { tasks: taskId } } // Pull (remove) the task ID from their tasks array
        );
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Failed to delete task" });
    }
});

module.exports = router;