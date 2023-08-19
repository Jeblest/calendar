const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { isLoggedOut, isLoggedIn } = require('../middleware')

router.get("/user", isLoggedIn, async (req, res) => {
    res.json(req.user)
})

router.post("/register", isLoggedOut, async (req, res) => {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        username,
        password: hashedPassword,
        email
    });
    try {
        await user.save();
        res.json(user)
    } catch (err) {
        res.status(400).json("error")
    }
})



router.post("/login", isLoggedOut, (req, res, next) => {

    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.status(400).json("login error");
        else {
            req.logIn(user, err => {
                if (err) throw err;
                res.json(req.user);
            })
        }
    })(req, res, next)
})

router.get("/login", isLoggedOut, (req, res) => {
    res.json("Login page")
})

router.get("/register", isLoggedOut, (req, res) => {
    res.json("Register page")
})



router.get("/logout", (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.json("Logged Out")
    });
})

module.exports = router;