const mongoose = require("mongoose")

const tasksSchema = mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    taskDescription: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    endedAt: Date
})

module.exports = mongoose.model("Task", tasksSchema)