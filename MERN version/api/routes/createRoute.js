const express = require('express');
const User = require('../models/user');


const createItem = async (model, modelText, req, res) => {
    const item = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" })
    const newTask = {
        ...item,
        user: user._id
    }
    try {
        const itemSave = new model(newTask)
        await itemSave.save();
        user[`${modelText.toLowerCase()}s`].push(itemSave._id);
        await user.save();
        res.json(itemSave)
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(400).json("Failed to create task")
    }
};

const getItems = async (model, modelText, req, res) => {
    try {
        const user = await User.findById(req.user.id).populate(`${modelText}s`);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user[`${modelText}s`]);
    } catch (error) {
        res.status(400).json(`Failed to get ${modelText}s`);
    }
};

const updateItem = async (model, modelText, req, res, itemId) => {
    // Update an item
    const updatedItem = req.body;

    try {
        const item = await model.findByIdAndUpdate(itemId, updatedItem, { new: true });

        if (!item) {
            return res.status(404).json({ error: `${modelText} not found` });
        }

        res.json(item);
    } catch (error) {
        console.error(`Error updating ${modelText}:`, error);
        res.status(400).json(`Failed to update ${modelText}`);
    }
};

const deleteItem = async (model, modelText, req, res, itemId) => {
    // Delete an item

    try {
        const item = await model.findByIdAndDelete(itemId);

        if (!item) {
            return res.status(404).json({ error: `${modelText} not found` });
        }
        await User.findByIdAndUpdate(
            req.user.id,
            { $pull: { [`${modelText.toLowerCase()}s`]: itemId } }
        );
        res.json({ message: `${modelText} deleted successfully` });
    } catch (error) {
        console.error(`Error deleting ${modelText}:`, error);
        res.status(400).json(`Failed to delete ${modelText}`);
    }
};


module.exports = { createItem, getItems, updateItem, deleteItem };