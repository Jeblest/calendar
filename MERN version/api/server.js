const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require("body-parser")
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const db = `mongodb+srv://jeblest:${process.env.DB_PASSWORD}@calendardata.4zlrh9g.mongodb.net/?retryWrites=true&w=majority`


mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log(err))

// ------------------End of Imports------------------

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(morgan("dev"))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
    store: MongoStore.create({
        mongoUrl: db,
        touchAfter: 24 * 3600 // time period in seconds
    })
}));
app.use(cookieParser(process.env.SESSION_SECRET))
app.use(passport.initialize());
app.use(passport.session());
require('./passport-config')(passport);

// ------------------End of Middleware------------------
app.use("/auth", require("./routes/auth"))
app.use("/task", require("./routes/task"))
app.use("/goal", require("./routes/goal"))
app.use("/note", require("./routes/note"))


// ------------------End of Routes------------------




app.listen(3000)