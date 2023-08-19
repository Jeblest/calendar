const express = require('express');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const bcrypt = require('bcryptjs');

module.exports = function (passport) {
  passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async function (email, password, done) {
      const user = await User.findOne({ email: email })
      if (!user) { return done(null, false, "User not found") }
      bcrypt.compare(password, user.password, (err, res) => {
        if (err) throw err;
        if (res) {
          return done(null, user);
        } else {
          return done(null, false, "Incorrect password");
        }
      })
    }))

  passport.serializeUser(function (user, cb) {
    cb(null, user.id);
  });

  passport.deserializeUser(async function (id, cb) {
    try {
      const user = await User.findById(id)
      cb(null, user);

    } catch (error) {
      cb(error, null)
    }

  });
}
