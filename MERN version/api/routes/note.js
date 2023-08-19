const express = require('express');
const router = express.Router();
const Note = require('../models/note');
const { isLoggedIn } = require('../middleware')
const { createItem, getItems, updateItem, deleteItem } = require('./createRoute')

router.route("/")
    .get(isLoggedIn, async (req, res) => await getItems(Note, "note", req, res))
    .post(isLoggedIn, async (req, res) => await createItem(Note, "note", req, res))

router.route("/:noteId")
    .put(isLoggedIn, async (req, res) => await updateItem(Note, "note", req, res, req.params.noteId))
    .delete(isLoggedIn, async (req, res) => await deleteItem(Note, "note", req, res, req.params.noteId))

module.exports = router;