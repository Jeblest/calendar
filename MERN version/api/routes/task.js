const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const { isLoggedIn } = require('../middleware')
const User = require('../models/user')
const { createItem,getItems, updateItem, deleteItem } = require('./createRoute')

router.route("/")
    .get(isLoggedIn, async (req, res) => await getItems(Task, "task", req, res))
    .post(isLoggedIn, async (req, res) => await createItem(Task, "task", req, res))


router.route("/:taskId")
    .put(isLoggedIn, async (req, res) => await updateItem(Task, "task", req, res, req.params.taskId))
    .delete(isLoggedIn, async (req, res) => await deleteItem(Task, "task", req, res, req.params.taskId))


    
module.exports = router;