const express = require('express');
const router = express.Router();
const Goal = require('../models/goal');
const { isLoggedIn } = require('../middleware')
const { createItem, getItems, updateItem, deleteItem } = require('./createRoute')



router.route("/")
    .get(isLoggedIn, async (req, res) => await getItems(Goal, "goal", req, res))
    .post(isLoggedIn, async (req, res) => await createItem(Goal, "goal", req, res))

router.route("/:goalId")
    .put(isLoggedIn, async (req, res) => await updateItem(Goal, "goal", req, res, req.params.goalId))
    .delete(isLoggedIn, async (req, res) => await deleteItem(Goal, "goal", req, res, req.params.goalId))

module.exports = router;