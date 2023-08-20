const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: "Task"
    }],
    goals: [{
        type: Schema.Types.ObjectId,
        ref: "Goal"
    }],
    notes: [{
        type: Schema.Types.ObjectId,
        ref: "Note"
    }]
})

module.exports = mongoose.model("User", userSchema)